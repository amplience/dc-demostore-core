import fetchPageData, { FetchPageDataInput } from './fetchPageData';
import { GetServerSidePropsContext } from 'next';
import { FetchMapInput } from '@utils/FetchMap';
import fetchContent, { CmsRequest } from '@lib/cms/fetchContent';
import { CmsHierarchyRequest, CmsHierarchyNode } from '@lib/cms/fetchHierarchy';
import { findInHierarchy } from '@utils/findInHierarchy';
import { findInContentMap } from '@utils/findInContentMap';
import { CustomerGroup } from '@amplience/dc-integration-middleware';

async function fetchStandardPageData<
    CT extends FetchMapInput<CmsRequest>,
    CH extends FetchMapInput<CmsHierarchyRequest>,
    ES extends FetchMapInput<CustomerGroup[]>,
>(input: FetchPageDataInput<CT, CH, ES>, context: GetServerSidePropsContext) {
    const data = await fetchPageData(
        {
            ...input,
            segments: {
                ...input.segments,
            },
            content: {
                ...input.content,
                configComponents: { key: 'config/components' },
            },
            hierarchies: {
                ...input.hierarchies,
                pages: {
                    tree: { key: 'homepage' },
                },
                themes: {
                    tree: { key: 'configuration/themes' },
                },
            },
        },
        context,
    );

    const pageNode = findInHierarchy((data.hierarchies as any).pages, (node: CmsHierarchyNode) => {
        const dk = context.req.url === '/' ? 'homepage' : context.req.url?.slice(1);
        return node.content?._meta?.deliveryKey === dk;
    });

    let page: any = {};

    if (pageNode && pageNode.content._meta?.schema?.indexOf('https://demostore.amplience.com/site/pages/') === 0) {
        const pageId = pageNode.content._meta.deliveryId;
        let fullPageContent = findInContentMap(data.content, (content) => content._meta.deliveryId === pageId);

        if (!fullPageContent) {
            [fullPageContent] = await fetchContent(
                [{ id: pageNode.content._meta.deliveryId }],
                data.context.cmsContext,
            );
        }

        page = {
            page: fullPageContent,
            children: pageNode.children,
        };
    }

    return {
        ...data,
        page,
    };
}

export default fetchStandardPageData;
