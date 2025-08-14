import { CmsHierarchyNode } from '@lib/cms/fetchHierarchy';
import { CategoryById, NavigationItem } from './NavigationContext';
import { Category } from '@amplience/dc-integration-middleware';

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
        case 'https://demostore.amplience.com/site/pages/ecommerce-container':
            return 'ecommerce-container';
        case 'https://demostore.amplience.com/site/pages/ecommerce-category-generated':
            return 'ecommerce-category-generated';
    }
    return null;
}

export function generateCmsCategory({ id, name, slug, children }: Category): CmsHierarchyNode {
    return {
        content: {
            _meta: {
                name,
                schema: 'https://demostore.amplience.com/site/pages/ecommerce-category-generated',
                deliveryKey: `category/${slug}`,
                hierarchy: {
                    parentId: 'generated',
                    root: false,
                },
                deliveryId: id,
            },
            hideProductList: false,
            components: [],
            slots: [],
            active: true,
            menu: {
                hidden: false,
            },
            categoryId: id,
        },
        children: children.map((child) => generateCmsCategory(child)),
    };
}

export function enrichEcommerceContainer(node: CmsHierarchyNode, categoriesById: CategoryById, categories: Category[]) {
    const { ecommerceConfiguration } = node.content;
    const categoryIds: string[] = ecommerceConfiguration?.showAll
        ? categories.map((category) => category.id)
        : ecommerceConfiguration?.categoryIds || [];

    return categoryIds.map((categoryId) => generateCmsCategory(categoriesById[categoryId]));
}

export function enrichCategory(node: CmsHierarchyNode, categoriesById: CategoryById) {
    return {
        ...node,
        children: categoriesById[node.content.categoryId]?.children.map((child) => generateCmsCategory(child)),
    };
}

export function enrichHierarchyNodes(
    hierarchyNode: CmsHierarchyNode,
    categoriesById: CategoryById,
    categories: Category[],
): CmsHierarchyNode {
    const overrideCategoryIds: string[] = [];

    const enrichHierarchy = (node: CmsHierarchyNode): CmsHierarchyNode => {
        const children = node.children
            .filter((childNode) => childNode.content?.active)
            .flatMap((childNode) => {
                if (getTypeFromSchema(childNode.content?._meta?.schema) === 'ecommerce-container') {
                    return enrichEcommerceContainer(childNode, categoriesById, categories);
                }
                if (getTypeFromSchema(childNode.content?._meta?.schema) === 'category') {
                    overrideCategoryIds.push(childNode.content.categoryId);
                    return enrichCategory(childNode, categoriesById);
                }
                return childNode;
            })
            .map((childNode) => enrichHierarchy(childNode));

        return { ...node, children };
    };

    const filterOverridesFromHierarchy = (node: CmsHierarchyNode): CmsHierarchyNode => {
        const children = node.children
            .filter((childNode) => {
                if (
                    getTypeFromSchema(childNode.content?._meta?.schema) === 'ecommerce-category-generated' &&
                    overrideCategoryIds.includes(childNode.content.categoryId)
                ) {
                    return false;
                }
                return true;
            })
            .map((childNode) => filterOverridesFromHierarchy(childNode));

        return { ...node, children };
    };

    const enrichedHierarchy = enrichHierarchy(hierarchyNode);
    const processedHierarchy = filterOverridesFromHierarchy(enrichedHierarchy);

    return processedHierarchy;
}
