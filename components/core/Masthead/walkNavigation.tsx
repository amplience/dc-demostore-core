import { CmsHierarchyNode } from '@lib/cms/fetchHierarchy';
import { NavigationItem } from './NavigationContext';

export default function walkNavigation(
    current: NavigationItem,
    visitor: (item: NavigationItem, parents: NavigationItem[]) => void,
    parents: NavigationItem[] = [],
) {
    visitor(current, parents);
    for (let child of current.children) {
        walkNavigation(child, visitor, [...parents, current]);
    }
}

export function walkNavigationItems(
    items: NavigationItem[],
    visitor: (item: NavigationItem, parents: NavigationItem[]) => void,
) {
    for (let item of items) {
        walkNavigation(item, visitor);
    }
}

export function getTypeFromSchema(schema: string) {
    switch (schema) {
        case 'https://demostore.amplience.com/site/pages/landing':
            return 'page';
        case 'https://demostore.amplience.com/site/pages/external':
            return 'external-page';
        case 'https://demostore.amplience.com/site/page-group':
            return 'group';
        case 'https://demostore.amplience.com/site/pages/category':
            return 'category';
        case 'https://demostore.amplience.com/site/pages/ecomm-category-placeholder':
            return 'ecomm-category-placeholder';
    }
    return null;
}

export function generateEcommItem({ id, name, slug, children }: any) {
    return {
        content: {
            _meta: {
                name,
                schema: 'https://demostore.amplience.com/site/pages/category',
                deliveryKey: `category/${slug}`,
                hierarchy: {
                    parentId: 'generated',
                    root: false,
                },
                deliveryId: id,
            },
            ecommCategories: true,
            hideProductList: false,
            components: [],
            slots: [],
            active: true,
            menu: {
                hidden: false,
            },
            name: id,
        },
        children: children.map(generateEcommItem),
    };
}

export function enrichCmsEntries(cmsEntry: CmsHierarchyNode, categoriesById: any, categories: any) {
    let categoryPosition = 0;
    const enrichedChildren = [];
    cmsEntry?.children.forEach((child) => {
        const childType = getTypeFromSchema(child.content?._meta?.schema);
        if (cmsEntry.content?.ecommCategories && childType === 'ecomm-category-placeholder') {
            categories
                .filter((ecommCategory: any) => !cmsEntry.children.some((c) => c.content.name === ecommCategory.id))
                .slice(categoryPosition, categoryPosition + child.content.categoryCount)
                .forEach((ecommCategory: any) => {
                    const ecommItem = generateEcommItem(ecommCategory);
                    enrichCmsEntries(ecommItem, categoriesById, categoriesById[ecommItem.content.name]?.children);
                    enrichedChildren.push(ecommItem);
                });
            categoryPosition += child.content.categoryCount;
        } else if (child.content?.ecommCategories && childType === 'category') {
            child.children = categoriesById[child.content.name]?.children.map(generateEcommItem);
            enrichedChildren.push(child);
        } else {
            enrichCmsEntries(child, categoriesById, null);
            enrichedChildren.push(child);
        }
    });
    cmsEntry.children = enrichedChildren;
}
