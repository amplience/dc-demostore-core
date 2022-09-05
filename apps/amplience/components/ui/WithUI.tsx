import React, { FC } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { WithTheme } from '@components/core';
import { WithUIContext } from "@components/ui";
import Head from "next/head";

export const WithUI: FC = ({children}) => {
    return (
        <WithTheme>
            <Head>
                <CssBaseline />
            </Head>
            <WithUIContext>
                {children}
            </WithUIContext>
        </WithTheme>
    );
}

export default WithUI;