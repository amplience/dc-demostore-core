import React, { PropsWithChildren, useEffect, useState } from 'react';
import { DemoStoreConfiguration } from './locator/types';
import { getConfig } from './locator/config-locator';

const Context = React.createContext<DemoStoreConfiguration | null>(null);

export function useAppContext(): DemoStoreConfiguration {
    return React.useContext(Context) as DemoStoreConfiguration;
}

interface WithLazyAppContextProps extends PropsWithChildren {}

export const WithLazyAppContext = (props: WithLazyAppContextProps) => {
    const { children } = props;

    const [context, setContext] = useState<any | null>(null);
    useEffect(() => {
        createAppContext().then(setContext);
    }, []);

    return context ? <Context.Provider value={context}>{children}</Context.Provider> : <div>loading...</div>;
};

interface WithAppContextProps extends PropsWithChildren {
    value: any;
}

export const WithAppContext = ({ children, value }: WithAppContextProps) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export async function createAppContext(): Promise<DemoStoreConfiguration> {
    let context: DemoStoreConfiguration = getConfig();

    // support older style config objects
    if (typeof context.cms.hub === 'object') {
        context.cms = {
            hub: (context.cms.hub as any).name,
            stagingApi: (context.cms.hub as any).stagingApi,
            imageHub: (context.cms as any).hubs.find((hub: any) => hub.key === 'productImages')?.name,
        };
    }

    return context;
}
