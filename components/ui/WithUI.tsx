import React, { PropsWithChildren } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { WithTheme } from '@components/core';
import { WithUIContext } from '@components/ui';
import Head from 'next/head';

interface WithUIProps extends PropsWithChildren {}

export const WithUI = ({ children }: WithUIProps) => {
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
