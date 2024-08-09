import { CmsContext } from './CmsContext';
import { CmsContent } from './CmsContent';

import { createAppContext } from '@lib/config/AppContext';
import { stringify } from 'querystring';
import { ContentBody, DefaultContentBody } from 'dc-delivery-sdk-js';
import fetchContent from './fetchContent';

export type CmsHierarchyRequest = { tree: { key: string } };

export type CmsHierarchyNode = {
    content: CmsContent;
    children: CmsHierarchyNode[];
};

async function fetchHierarchyRootNode(
    hierarchyRequest: CmsHierarchyRequest,
    context: CmsContext,
): Promise<ContentBody> {
    const [rootNode] = await fetchContent([{ key: hierarchyRequest.tree.key }], context, {
        depth: 'root',
        format: 'linked',
    });

    return rootNode as DefaultContentBody;
}

async function fetchHierarchyDescendants(id: string, context: CmsContext, params = {}) {
    const { cms } = await createAppContext();
    const host = context.stagingApi || `${cms.hub}.cdn.content.amplience.net`;
    const fetchParams = {
        maxPageSize: 20,
        hierarchyDepth: 10,
        ...params,
    };
    return fetch(`https://${host}/content/hierarchies/descendants/id/${id}?${stringify(fetchParams)}`).then((x) =>
        x.json(),
    );
}

async function fetchAllHierarchyDescendants(parentId: string, context: CmsContext): Promise<DefaultContentBody[]> {
    const pagingHandler = async (id: string, context: CmsContext, params = {}): Promise<DefaultContentBody[]> => {
        const results = await fetchHierarchyDescendants(id, context, params);
        if (results.page.cursor) {
            return results.responses.concat(await pagingHandler(id, context, { pageCursor: results.page.cursor }));
        }
        return results.responses;
    };

    return await pagingHandler(parentId, context);
}

function unflattenDescendants(parentId: string, descendants: DefaultContentBody[] = []): any {
    return descendants
        .filter((item) => item.content._meta?.hierarchy?.parentId === parentId)
        .filter((item) => item.content.active === true)
        .sort(
            (a, b) =>
                (a.content?.menu?.priority || a.content?.priority || 0) -
                (b.content?.menu?.priority || b.content?.priority || 0),
        )
        .map((child) => ({
            ...child,
            children: unflattenDescendants(child.content._meta.deliveryId, descendants),
        }));
}

async function fetchHierarchy(items: CmsHierarchyRequest[], context: CmsContext): Promise<(CmsHierarchyNode | null)[]> {
    return await Promise.all(
        items.map(async (item) => {
            const rootNode = await fetchHierarchyRootNode(item, context);
            const descendants = await fetchAllHierarchyDescendants(rootNode._meta.deliveryId, context);
            const descendantsTree = unflattenDescendants(rootNode._meta.deliveryId, descendants);
            const response: any = {
                content: rootNode,
                children: descendantsTree,
            };
            return response;
        }),
    );
}

export default fetchHierarchy;
