import _ from 'lodash';
import { FetchMapInput } from '@utils/FetchMap';
import { CmsRequest } from '@lib/cms/fetchContent';
import fetchContentMap from '@lib/cms/fetchContentMap';
import { GetServerSidePropsContext } from 'next';
import { createCmsContext } from '@lib/cms/CmsContext';
import { createUserContext } from '@lib/user/UserContext';
import { createAppContext } from '@lib/config/AppContext';
import { enrichPageContent } from './pageContent/enrichPageContent';
import { CmsHierarchyRequest } from '@lib/cms/fetchHierarchy';
import fetchHierarchyMap from '@lib/cms/fetchHierarchyMap';
import { commerceApi } from '@pages/api';
import { clearUndefined } from '@lib/util';
import { Category, CustomerGroup } from '@amplience/dc-integration-middleware';
import { getVendorName } from '@lib/config/locator/config-locator';

export type FetchPageDataInput<
    CT extends FetchMapInput<CmsRequest>,
    CH extends FetchMapInput<CmsHierarchyRequest>,
    ES extends FetchMapInput<CustomerGroup[]>
> = {
    content: CT;
    hierarchies?: CH;
    segments?: ES;
};

/**
 * Fetches the core set of data required to render a page in parallel
 */
async function fetchPageData<
    CT extends FetchMapInput<CmsRequest>,
    CH extends FetchMapInput<CmsHierarchyRequest>,
    ES extends FetchMapInput<CustomerGroup[]>
>(input: FetchPageDataInput<CT, CH, ES>, context: GetServerSidePropsContext) {
    const cmsContext = await createCmsContext(context.req);
    const userContext = await createUserContext(context);

    const content = await fetchContentMap(input.content, cmsContext);
    const hierarchies = await fetchHierarchyMap(input.hierarchies || {}, cmsContext);

    const categories = clearUndefined(
        (await commerceApi.getCategoryTree({ ...cmsContext, ...userContext })) as any
    ) as Category[];
    const segments = (await commerceApi.getCustomerGroups({ ...cmsContext, ...userContext })) as CustomerGroup[];
    const vendor = getVendorName();

    return {
        context: {
            cmsContext,
            userContext,
            appContext: await createAppContext(),
        },
        content: await enrichPageContent(content, cmsContext),
        hierarchies: await enrichPageContent(hierarchies, cmsContext),
        ecommerce: {
            segments,
            categories,
            vendor,
        },
    };
}

export default fetchPageData;
