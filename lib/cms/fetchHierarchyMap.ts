import { CmsContext } from './CmsContext';
import { FetchMapInput, FetchMapOutput, fetchMap } from '@utils/FetchMap';
import fetchHierarchy, { CmsHierarchyRequest, CmsHierarchyNode } from './fetchHierarchy';
import { withRetry } from '@utils/withRetry';

async function fetchHierarchyMap<T extends FetchMapInput<CmsHierarchyRequest>>(
    map: T,
    context: CmsContext
): Promise<FetchMapOutput<T, CmsHierarchyRequest, CmsHierarchyNode | null>> {
    return await withRetry(() => {
        return fetchMap(map, (items) => {
            return fetchHierarchy(items, context);
        });
    }, 'fetchHierarchyMap');
}

export default fetchHierarchyMap;
