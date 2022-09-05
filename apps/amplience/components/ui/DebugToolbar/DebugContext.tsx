import React, { createContext, useContext, FC, useState } from "react";

export type DebugState = {
    debugging: boolean;
    showSlots: boolean;
    showContent: boolean;
    showEditions: boolean;

    personalizationTags: string[];
    personalizationBehaviors: string[];

    setDebugging: (debug: boolean) => void;
    setShowSlots: (show: boolean) => void;
    setShowContent: (show: boolean) => void;
    setShowEditions: (show: boolean) => void;
    setPersonalizationTags: (value: string[]) => void;
    setPersonalizationBehaviors: (value: string[]) => void;
}


const Context = createContext<(DebugState)| null>(null);

export function useDebug(): DebugState {
    return useContext(Context) as DebugState;
}

export const WithDebugState: FC = ({children}) => {
    const [debugging, setDebugging] = useState(false);
    const [showSlots, setShowSlots] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showEditions, setShowEditions] = useState(false);

    const [personalizationTags, setPersonalizationTags] = useState<string[]>([]);
    const [personalizationBehaviors, setPersonalizationBehaviors] = useState<string[]>([]);

    return <Context.Provider value={{
        debugging,
        setDebugging,
        showSlots,
        setShowSlots,
        showContent,
        setShowContent,
        showEditions,
        setShowEditions,
        personalizationTags,
        setPersonalizationTags,
        personalizationBehaviors,
        setPersonalizationBehaviors
    }}>
        {children}
    </Context.Provider>
}