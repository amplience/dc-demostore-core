import React, { PropsWithChildren } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { WithTheme } from '@components/core';
import { WithUIContext } from '@components/ui';
import Head from 'next/head';

interface Props extends PropsWithChildren {}

export const WithUI = ({ children }: Props) => {
    return (
        <WithTheme>
            <Head>
                <CssBaseline />
            </Head>
            <WithUIContext>{children}</WithUIContext>
        </WithTheme>
    );
};

export default WithUI;
