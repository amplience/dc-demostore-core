import { createContext, FC, useContext } from "react";
import { CmsHierarchyNode } from "@lib/cms/fetchHierarchy";

export type ThemesState = {
    themes: CmsHierarchyNode;
};

const ThemesContext = createContext<ThemesState | null>(null);

export const WithThemesContext: FC<{
    themes: CmsHierarchyNode,
}> = ({ themes, children }) => {

    return <ThemesContext.Provider value={{ themes }}>
        {children}
    </ThemesContext.Provider>;
}

export function useThemes(): ThemesState {
    return useContext(ThemesContext) as ThemesState;
}