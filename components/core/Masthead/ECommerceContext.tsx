import { createContext, FC, useMemo, useContext } from "react";
import { Category, CustomerGroup } from "@amplience/dc-integration-middleware";

export type ECommerceState = {
    categories: Category[]
    segments: CustomerGroup[]
    vendor: string
};

const ECommerceContext = createContext<ECommerceState | null>(null);

export const WithECommerceContext: FC<{
    segments: CustomerGroup[],
    categories: Category[],
    vendor: string
}> = ({ segments, categories, vendor, children }) => {

    return <ECommerceContext.Provider value={{
        segments,
        categories,
        vendor
    }}>
        {children}
    </ECommerceContext.Provider>;
}

export function useECommerce(): ECommerceState {
    return useContext(ECommerceContext) as ECommerceState;
}