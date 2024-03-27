import React, { PropsWithChildren } from 'react';
import { GetServerSidePropsContext } from 'next';

const Cookies = require('cookies');

export type UserContext = {
    userId?: string;
    sessionId?: string;

    language: string;
    country: string;
    currency: string;

    segment?: string;

    engines: {};
};

const Context = React.createContext<UserContext | null>(null);

export function useUserContext(): UserContext {
    return React.useContext(Context) as UserContext;
}

interface WithUserContextProps extends PropsWithChildren {
    value: UserContext;
}

export const WithUserContext = ({ children, value }: WithUserContextProps) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

function pathname(url: string | undefined) {
    if (!url) {
        return url;
    } else {
        return url.slice(0, url.indexOf('?'));
    }
}

export async function createUserContext(context: GetServerSidePropsContext): Promise<UserContext> {
    const cookies = new Cookies(context.req);
    const segment = cookies.get('segment');
    const locale = cookies.get('locale') || 'en-US';
    const currency = cookies.get('currency') || 'USD';

    let result: UserContext = {
        segment: segment || null,
        engines: {},
        language: locale.split('-')[0],
        country: locale.split('-')[1],
        currency,
    };

    return result;
}
