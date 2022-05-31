import React, { FC, useEffect, useState } from 'react';
import { DemoStoreConfiguration, getDemoStoreConfig } from '@amplience/dc-demostore-integration';
import { CmsContent } from '@lib/cms/CmsContent';

const Context = React.createContext<DemoStoreConfiguration | null>(null);

export function useAppContext(): DemoStoreConfiguration {
    return React.useContext(Context) as DemoStoreConfiguration;
}

interface Props {
    children: (args: {content?: CmsContent}) => React.ReactElement;
}

export const WithLazyAppContext: React.SFC<Props> = (props) => {
    const {
        children,
    } = props;

    const [context, setContext] = useState<any | null>(null);
    useEffect(() => {
        createAppContext().then(setContext)
    }, []);

    return context ? <Context.Provider value={context}>
        { children }
    </Context.Provider> : <div>loading...</div>;
};

export const WithAppContext: FC<{ value: DemoStoreConfiguration }> = ({children, value}) => {
    return <Context.Provider value={value}>
        { children }
    </Context.Provider>;    
};

export const configLocator = process.env.NEXT_PUBLIC_DEMOSTORE_CONFIG_LOCATOR || `amprsaprod:default`
export async function createAppContext(): Promise<DemoStoreConfiguration> {
    let context: DemoStoreConfiguration = await getDemoStoreConfig(configLocator)

    // support older style config objects
    if (typeof context.cms.hub === 'object') {
        context.cms = {
            hub: (context.cms.hub as any).name,
            stagingApi: (context.cms.hub as any).stagingApi,
            imageHub: (context.cms as any).hubs.find((hub: any) => hub.key === 'productImages')?.name
        }
    }

    return context
}