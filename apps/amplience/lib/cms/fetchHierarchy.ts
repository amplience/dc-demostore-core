import { CmsContext } from './CmsContext';
import { CmsContent } from './CmsContent';

import fetchContent, { GetByFilterRequest } from './fetchContent';

export type CmsHierarchyRequest = { tree: { key: string } };

export type CmsHierarchyNode = {
    content: CmsContent,
    children: CmsHierarchyNode[]
};

async function getChildren(nodeId: string, context: CmsContext): Promise<CmsHierarchyNode[]> {
    const childrenRequest: GetByFilterRequest = {
        "filterBy": [
            {
                "path": "/_meta/hierarchy/parentId",
                "value": nodeId
            }
        ],
        "sortBy": {
            "key": "default",
            "order": "asc"
        }
    };
    const [children] = await fetchContent([childrenRequest], context, { depth: "root", format: "inlined" });
    const responses: any[] = children?.responses || [];
    const subChildren = await Promise.all(
        responses.map((child: any) => {
            return getChildren(child.content._meta.deliveryId, context)
        }));
    responses.forEach((element: any, i: number) => {
        responses[i].children = subChildren[i];
    });

    return responses;
}

async function fetchHierarchy(items: CmsHierarchyRequest[], context: CmsContext): Promise<(CmsHierarchyNode | null)[]> {
    return await Promise.all(items.map(async item => {
        // Get Root node from key
        const [rootNode] = await fetchContent([{ key: item.tree.key }], context, { depth: "root", format: "linked" });
        const children: CmsHierarchyNode[] = await getChildren((rootNode as any)._meta.deliveryId, context);

        // Return response
        const response: any = {
            content: rootNode,
            children: children
        }
        return response;
    }))
}

export default fetchHierarchy;