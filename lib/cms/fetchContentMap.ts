import { CmsContext } from './CmsContext';
import { CmsContent } from './CmsContent';
import fetchContent, { CmsRequest } from './fetchContent';

import { FetchMapInput, FetchMapOutput, fetchMap } from '@utils/FetchMap';

async function fetchContentMap<T extends FetchMapInput<CmsRequest>>(map: T, context: CmsContext): Promise<FetchMapOutput<T, CmsRequest, (CmsContent | null)>> {
    return fetchMap(map, (items) => {
        return fetchContent(items, context);
    });
}

export default fetchContentMap;