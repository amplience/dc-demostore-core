import React, { createContext, useContext } from 'react';

type ConfigState = {
    values: {
        [key: string]: any;
    };
};

export const ConfigContext = createContext<ConfigState | null>(null);

export function useConfig() {
    return useContext(ConfigContext);
}
