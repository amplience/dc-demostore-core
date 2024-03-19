import React, { PropsWithChildren } from 'react';
import { IncomingMessage } from 'http';
import { parse } from 'url';

const Cookies = require('cookies');

export type CmsContext = {
    stagingApi?: string;
    locale?: string;
    currency?: string;
    timestamp?: number;
};

const Context = React.createContext<CmsContext | null>(null);

export function useCmsContext(): CmsContext {
    return React.useContext(Context) as CmsContext;
}

interface Props extends PropsWithChildren {
    value: CmsContext;
}

export const WithCmsContext = ({ children, value }: Props) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export async function createCmsContext(req: IncomingMessage): Promise<CmsContext> {
    const { url = '' } = req || {};

    const { query } = parse(url, true);

    const { vse: queryStringVse, locale: queryStringLocale } = query || {};

    const cookies = new Cookies(req);
    const cookieVse = cookies.get('amplience-host');
    const cookieTimestamp = cookies.get('timestamp');
    const cookieLocale = cookies.get('locale');
    const cookieCurrency = cookies.get('currency');

    return {
        stagingApi: queryStringVse || cookieVse || null,
        locale: queryStringLocale || cookieLocale || 'en-US',
        currency: cookieCurrency || 'USD',
        timestamp: cookieTimestamp || null,
    };
}
