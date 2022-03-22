import fetch from 'isomorphic-unfetch';
import { CmsContext } from './CmsContext';
import { CmsContent } from './CmsContent';

import { FetchMapInput, FetchMapOutput, fetchMap } from '@utils/FetchMap';
import fetchHierarchy, { CmsHierarchyRequest, CmsHierarchyNode } from './fetchHierarchy';

async function fetchHierarchyMap<T extends FetchMapInput<CmsHierarchyRequest>>(map: T, context: CmsContext): Promise<FetchMapOutput<T, CmsHierarchyRequest, (CmsHierarchyNode | null)>> {
    return fetchMap(map, (items) => {
        return fetchHierarchy(items, context);
    });
}

export default fetchHierarchyMap;