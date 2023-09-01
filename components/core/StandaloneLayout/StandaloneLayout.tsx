import React, { FC } from 'react';

import { WithNavigationContext } from '../Masthead';
import { WithCMSTheme, WithThemesContext } from '../WithCMSTheme';

interface Props {
    pageProps: {
        content: any;
        hierarchies: any;
        ecommerce: any;
    };
}

const StandaloneLayout: FC<Props> = ({ children, pageProps }) => {
    return (
        <WithThemesContext themes={pageProps.hierarchies.themes}>
            <WithCMSTheme
                themes={pageProps.hierarchies.themes}
            >
                <WithNavigationContext
                    pages={pageProps.hierarchies.pages}
                    segments={pageProps.ecommerce.segments}
                    categories={pageProps.ecommerce.categories}
                >
                    <div>
                        {children}
                    </div>
                </WithNavigationContext>
            </WithCMSTheme>
        </WithThemesContext>
    );
};

export default StandaloneLayout;
