import { CmsContext } from './CmsContext';
import { CmsContent } from './CmsContent';
import fetchContent, { CmsRequest } from './fetchContent';

import { FetchMapInput, FetchMapOutput, fetchMap } from '@utils/FetchMap';
import { withRetry } from '@utils/withRetry';

async function fetchContentMap<T extends FetchMapInput<CmsRequest>>(map: T, context: CmsContext): Promise<FetchMapOutput<T, CmsRequest, (CmsContent | null)>> {
    return await withRetry(() => {
        return fetchMap(map, (items) => {
            return fetchContent(items, context);
        });
    }, 'fetchContentMap')
}

export default fetchContentMap;