import { createContext } from 'react';

export type ProductSearchState = {
    facetFilters: {
        [key: string]: string[];
    };
    setFacetFilter: (key: string, filters: string[]) => void;
};

export const ProductSearchContext = createContext<ProductSearchState | null>(null);
