import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

export type AcceleratedMediaState = {
    acceleratedMedia: boolean;
    setAcceleratedMedia: (acceleratedMedia: boolean) => void;
};

const Context = createContext<AcceleratedMediaState>({ acceleratedMedia: false, setAcceleratedMedia: () => {} });

export function useAcceleratedMedia(): AcceleratedMediaState {
    return useContext(Context) as AcceleratedMediaState;
}

interface WithAcceleratedMediaStateProps extends PropsWithChildren {}

export const WithAcceleratedMediaState = (props: WithAcceleratedMediaStateProps) => {
    const [acceleratedMedia, setAcceleratedMedia] = useState(true);

    return (
        <Context.Provider
            value={{
                acceleratedMedia,
                setAcceleratedMedia,
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
