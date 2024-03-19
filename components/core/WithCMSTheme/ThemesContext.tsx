import { PropsWithChildren, createContext, useContext } from 'react';
import { CmsHierarchyNode } from '@lib/cms/fetchHierarchy';

export type ThemesState = {
    themes: CmsHierarchyNode;
};

const ThemesContext = createContext<ThemesState | null>(null);

interface Props extends PropsWithChildren {
    themes: CmsHierarchyNode;
}

export const WithThemesContext = ({ themes, children }: Props) => {
    return <ThemesContext.Provider value={{ themes }}>{children}</ThemesContext.Provider>;
};

export function useThemes(): ThemesState {
    return useContext(ThemesContext) as ThemesState;
}
