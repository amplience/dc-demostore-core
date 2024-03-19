import '../styles/main.scss';
import 'pure-react-carousel/dist/react-carousel.es.css';

import React, { PropsWithChildren } from 'react';
import type { AppProps } from 'next/app';
import NextApp from 'next/app';
import { Head, WithVisualization } from '@components/core';
import { WithUserContext } from '@lib/user/UserContext';
import { WithCmsContext } from '@lib/cms/CmsContext';
import { WithAppContext } from '@lib/config/AppContext';
import { WithDebugState, WithUI } from '@components/ui';
import { WithAcceleratedMediaState } from '@components/admin/AdminPanel/context/AcceleratedMediaContext';
import { WithWindowContext } from '@components/core/WithWindowContext/WindowContext';
import { configureAnalytics } from '@lib/analytics/configureAnalytics';
import WithCart from '@components/cart/CartContext';

import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import ErrorPage from 'next/error';
import { ConfigContext } from '../components/core/Config';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface Props extends PropsWithChildren {}

const Noop = ({ children }: Props) => <>{children}</>;

export default class MyApp extends NextApp<AppProps> {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        configureAnalytics();
    }

    render() {
        const { Component, pageProps } = this.props;

        const Layout = (Component as any).Layout || Noop;

        if ((pageProps as any).statusCode) {
            return <ErrorPage statusCode={(pageProps as any).statusCode} />;
        }

        return (
            <>
                <Head />
                <WithAppContext value={(pageProps as any).context?.appContext}>
                    <WithVisualization>
                        <WithUI>
                            <WithCart>
                                <WithUserContext value={(pageProps as any).context?.userContext}>
                                    <WithCmsContext value={(pageProps as any).context?.cmsContext}>
                                        <ConfigContext.Provider
                                            value={{ values: (pageProps as any).content?.configComponents }}
                                        >
                                            <WithDebugState>
                                                <WithAcceleratedMediaState>
                                                    <WithWindowContext>
                                                        <Layout pageProps={pageProps}>
                                                            <Component {...pageProps} />
                                                        </Layout>
                                                    </WithWindowContext>
                                                </WithAcceleratedMediaState>
                                            </WithDebugState>
                                        </ConfigContext.Provider>
                                    </WithCmsContext>
                                </WithUserContext>
                            </WithCart>
                        </WithUI>
                    </WithVisualization>
                </WithAppContext>
            </>
        );
    }
}
