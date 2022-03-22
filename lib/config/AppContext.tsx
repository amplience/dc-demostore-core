import React, { FC, useEffect, useState } from 'react';
import { AMPRSAConfiguration, getConfig } from '@amplience/aria';
import { CmsContent } from '@lib/cms/CmsContent';

const Context = React.createContext<AMPRSAConfiguration | null>(null);

export function useAppContext(): AMPRSAConfiguration {
    return React.useContext(Context) as AMPRSAConfiguration;
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
        createAppContext().then(async context => {
            setContext(context)
        })
    }, []);

    return context ? <Context.Provider value={context}>
        { children }
    </Context.Provider> : <div>loading...</div>;
};

export const WithAppContext: FC<{ value: AMPRSAConfiguration }> = ({children, value}) => {
    return <Context.Provider value={value}>
        { children }
    </Context.Provider>;    
};

export const configLocator = process.env.NEXT_PUBLIC_ARIA_CONFIG_LOCATOR || process.env.STORYBOOK_ARIA_CONFIG_LOCATOR || `aria:default`
export async function createAppContext(): Promise<AMPRSAConfiguration> {
    let x = await getConfig(configLocator)
    x.commerce = x.commerce || null
    return x
}