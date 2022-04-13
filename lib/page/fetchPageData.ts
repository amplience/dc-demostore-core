import _ from 'lodash'
import { FetchMapInput, FetchMapOutput } from "@utils/FetchMap";
import { CmsRequest } from "@lib/cms/fetchContent";
import fetchContentMap from "@lib/cms/fetchContentMap";
import { GetServerSidePropsContext } from "next";
import { createCmsContext } from "@lib/cms/CmsContext";
import { createUserContext, UserContext } from "@lib/user/UserContext";
import { createAppContext } from "@lib/config/AppContext";
import { CmsContent } from "@lib/cms/CmsContent";
import { enrichPageContent } from "./pageContent/enrichPageContent";
import { CmsHierarchyRequest, CmsHierarchyNode } from "@lib/cms/fetchHierarchy";
import fetchHierarchyMap from "@lib/cms/fetchHierarchyMap";
import { getCategory, getMegaMenu } from "@lib/ecommerce/api";
import { measurePromiseDuration } from "@utils/measurePromiseDuration";
import { withRetry } from '@utils/withRetry';
import { qc } from '@amplience/dc-demostore-integration';

export type FetchPageDataInput<
    CT extends FetchMapInput<CmsRequest>, 
    CH extends FetchMapInput<CmsHierarchyRequest>
> = {
    content: CT,
    hierarchies?: CH
};

/**
 * Fetches the core set of data required to render a page in parallel 
 */
async function fetchPageData<
    CT extends FetchMapInput<CmsRequest>, 
    CH extends FetchMapInput<CmsHierarchyRequest>
>(input: FetchPageDataInput<CT, CH>, context: GetServerSidePropsContext) {
    const cmsContext = await createCmsContext(context.req);

    const content = measurePromiseDuration('contentMap', withRetry(() => fetchContentMap(input.content, cmsContext), 'fetchContentMap'));
    const hierarchies = measurePromiseDuration('hierarchyMap', withRetry(() => fetchHierarchyMap(input.hierarchies || {}, cmsContext), 'fetchHierarchyMap'));
    const userContext = await measurePromiseDuration('createUserContext', withRetry(() => createUserContext(context), 'createUserContext'));

    const enrichedContent = content.then(x => measurePromiseDuration('enrichContent', withRetry(() => enrichPageContent(x, cmsContext), 'enrichPageContent')));
    const enrichesHierarchies = hierarchies.then(x => measurePromiseDuration('enrichHierarchies', withRetry(() => enrichPageContent(x, cmsContext), 'enrichPageContent')));

    let enriched = (await enrichedContent) as FetchMapOutput<typeof input.content, CmsRequest, CmsContent>
    let enrichedHierarchies = (await enrichesHierarchies) as FetchMapOutput<NonNullable<typeof input.hierarchies>, CmsHierarchyRequest, CmsHierarchyNode>

    let children = (enrichedHierarchies as any).pages?.children
    let categories = await getMegaMenu()
    return {
        context: {
            cmsContext,
            userContext,
            appContext: await createAppContext()
        },
        content: enriched,
        hierarchies: enrichedHierarchies,
        ecommerce: {
            categories
        }
    }
}

export default fetchPageData;