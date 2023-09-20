import React, { createContext, useContext, FC, useState } from "react";

export type AcceleratedMediaState = {
    acceleratedMedia: boolean;
    setAcceleratedMedia: (acceleratedMedia: boolean) => void;
}


const Context = createContext<(AcceleratedMediaState)| null>(null);

export function useAcceleratedMedia(): AcceleratedMediaState {
    return useContext(Context) as AcceleratedMediaState;
}

export const WithAcceleratedMediaState: FC = ({children}) => {
    const [acceleratedMedia, setAcceleratedMedia] = useState(true)

    return <Context.Provider value={{
        acceleratedMedia,
        setAcceleratedMedia,
    }}>
        {children}
    </Context.Provider>
}