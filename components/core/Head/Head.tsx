import React from 'react';
import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';
import { getHubName } from '@lib/config/locator/config-locator';

const Head = () => {
    const hubname = getHubName();

    return (
        <>
            <DefaultSeo />
            <NextHead>
                <meta charSet="utf8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <meta name="aria_config_locator_hub" content={hubname} />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <title>Amplience Retail Storefront Website</title>
            </NextHead>
        </>
    );
};

export default Head;
