import React, { FC } from 'react'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'
import { configLocator } from '@lib/config/AppContext'

const Head: FC = () => {

    const configArray = configLocator.split(":");
    const hubname = configArray[0];
    const env = configArray[1];

    return (
        <>
            <DefaultSeo />
            <NextHead>
                <meta charSet="utf8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <meta name="aria_config_locator_hub" content={hubname} />
                <meta name="aria_config_locator_env" content={env} />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <title>Amplience Retail Storefront Website</title>
            </NextHead>
        </>
    )
}

export default Head