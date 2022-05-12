import _ from 'lodash'
import fetch from 'isomorphic-unfetch';
import { CmsContext } from './CmsContext';
import { CmsContent } from './CmsContent';

import { createAppContext } from '@lib/config/AppContext';
import { stringify } from 'querystring';

export type GetByIdRequest = { id: string };
export type GetByKeyRequest = { key: string };
export type GetByFilterRequest = {
    filterBy: { path: string, value: any }[],
    sortBy?: {
        key: string;
        order?: 'asc' | 'desc'
    },
    page?: {
        size: number,
        cursor?: string
    }
};

export type CmsRequest = GetByIdRequest | GetByKeyRequest | GetByFilterRequest;
export type CmsResponse = { content: CmsContent };

export type CmsFilterResponse = {
    responses: CmsResponse[],
    page: {
        responseCount: number,
        cursor?: string
    }
}

function isGetByIdRequest(request: any): request is GetByIdRequest {
    return request && request['id'] !== undefined;
}

function isGetByFilterRequest(request: any): request is GetByFilterRequest {
    return request && request.filterBy && Array.isArray(request.filterBy);
}

const fetchContent = async (items: CmsRequest[], context: CmsContext, parameters = { "depth": "all", "format": "inlined" }): Promise<(CmsContent | CmsFilterResponse | null)[]> => {
    const { cms } = await createAppContext()
    const host = cms.stagingApi || `${cms.hub}.cdn.content.amplience.net`;
    return await Promise.all(items.map((request: CmsRequest): Promise<CmsContent | CmsFilterResponse> => {
        if (isGetByFilterRequest(request)) {
            let body = JSON.stringify({
                ...request,
                parameters
            })
            return fetch(`https://${host}/content/filter`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
            }).then(x => x.json());
        }
        else {
            let path = isGetByIdRequest(request) ? `id/${request.id}` : `key/${(request as GetByKeyRequest).key}`
            let params = {
                ...parameters,
                locale: context.locale
            }
            return fetch(`https://${host}/content/${path}?${stringify(params)}`).then(x => x.json()).then(x => x.content || null)
        }
    }));
}

export default fetchContent
