import { createContext, useMemo, useContext, PropsWithChildren } from 'react';
import { Category, CustomerGroup } from '@amplience/dc-integration-middleware';

export type ECommerceState = {
    categories: Category[];
    categoriesById: { [key: string]: Category };
    categoriesBySlug: { [key: string]: Category };
    segments: CustomerGroup[];
    vendor: string;
};

const ECommerceContext = createContext<ECommerceState | null>(null);

interface Props extends PropsWithChildren {
    segments: CustomerGroup[];
    categories: Category[];
    vendor: string;
}

export const WithECommerceContext = ({ segments, categories, vendor, children }: Props) => {
    // Flatten a hierarchy of children
    const flattenCategories = (categories: any[]) => {
        const allCategories: any[] = [];
        const bulldozeCategories = (cat: any) => {
            allCategories.push(cat);
            cat.children && cat.children.forEach(bulldozeCategories);
        };
        categories.forEach(bulldozeCategories);
        return allCategories;
    };

    // Merge together CMS + commerce categories into a single navigation structure
    const categoriesBySlug = useMemo(() => {
        const result: { [key: string]: Category } = {};
        for (let item of flattenCategories(categories)) {
            result[item.slug] = item;
        }
        return result;
    }, [categories]);

    // Merge together CMS + commerce categories into a single navigation structure
    const categoriesById = useMemo(() => {
        const result: { [key: string]: Category } = {};
        for (let item of flattenCategories(categories)) {
            result[item.id] = item;
        }
        return result;
    }, [categories]);

    return (
        <ECommerceContext.Provider
            value={{
                categories,
                categoriesById,
                categoriesBySlug,
                segments,
                vendor,
            }}
        >
            {children}
        </ECommerceContext.Provider>
    );
};

export function useECommerce(): ECommerceState {
    return useContext(ECommerceContext) as ECommerceState;
}
