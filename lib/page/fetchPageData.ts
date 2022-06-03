import _ from 'lodash'
import { FetchMapInput } from "@utils/FetchMap";
import { CmsRequest } from "@lib/cms/fetchContent";
import fetchContentMap from "@lib/cms/fetchContentMap";
import { GetServerSidePropsContext } from "next";
import { createCmsContext } from "@lib/cms/CmsContext";
import { createUserContext } from "@lib/user/UserContext";
import { configLocator, createAppContext } from "@lib/config/AppContext";
import { enrichPageContent } from "./pageContent/enrichPageContent";
import { CmsHierarchyRequest } from "@lib/cms/fetchHierarchy";
import fetchHierarchyMap from "@lib/cms/fetchHierarchyMap";
import { commerceApi } from '@pages/api';

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
    const userContext = await createUserContext(context);

    const content = await fetchContentMap(input.content, cmsContext)
    const hierarchies = await fetchHierarchyMap(input.hierarchies || {}, cmsContext)

    return {
        context: {
            cmsContext,
            userContext,
            appContext: await createAppContext()
        },
        content: await enrichPageContent(content, cmsContext),
        hierarchies: await enrichPageContent(hierarchies, cmsContext),
        ecommerce: {
            categories: await commerceApi.getMegaMenu({ ...cmsContext, ...userContext })
        }
    }
}

export default fetchPageData;