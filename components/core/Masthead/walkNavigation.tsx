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

    return categoryIds.map((categoryId) =>
        enrichHierarchyNodes(generateCmsCategory(categoriesById[categoryId]), categoriesById, categories),
    );
}

export function enrichCategory(node: CmsHierarchyNode, categoriesById: CategoryById) {
    return {
        ...node,
        children: categoriesById[node.content.categoryId]?.children.map((child) => generateCmsCategory(child)),
    };
}

export function enrichNodes(nodes: CmsHierarchyNode[], categoriesById: CategoryById, categories: Category[]) {
    return nodes.flatMap((node) => {
        if (getTypeFromSchema(node.content?._meta?.schema) === 'ecommerce-container') {
            return enrichEcommerceContainer(node, categoriesById, categories);
        }
        if (getTypeFromSchema(node.content?._meta?.schema) === 'category') {
            return enrichCategory(node, categoriesById);
        }
        return node;
    });
}

export function applyCmsOverrides(nodes: CmsHierarchyNode[]) {
    return nodes.flatMap((node) => {
        if (getTypeFromSchema(node.content?._meta?.schema) === 'category') {
            const matchingEcommOverride = nodes.find(
                (n) =>
                    getTypeFromSchema(n.content?._meta?.schema) === 'ecommerce-category-generated' &&
                    node.content.categoryId === n.content.categoryId,
            );
            // remove the category if used as an override
            return matchingEcommOverride ? [] : node;
        }
        if (getTypeFromSchema(node.content?._meta?.schema) === 'ecommerce-category-generated') {
            const matchingCmsOverride = nodes.find(
                (n) =>
                    getTypeFromSchema(n.content?._meta?.schema) === 'category' &&
                    n.content.categoryId === node.content?.categoryId,
            );
            // replace ecomm category if matching cms category exists
            return matchingCmsOverride ? matchingCmsOverride : node;
        }

        return node;
    });
}

export function enrichHierarchyNodes(
    hierarchNode: CmsHierarchyNode,
    categoriesById: CategoryById,
    categories: Category[],
): CmsHierarchyNode {
    const activeChildNodes = hierarchNode.children.filter((node) => node.content?.active);
    const enrichedChildNodes = enrichNodes(activeChildNodes, categoriesById, categories);
    const enrichedChildNodesWithCmsOverrides = applyCmsOverrides(enrichedChildNodes);

    return { content: hierarchNode.content, children: enrichedChildNodesWithCmsOverrides };
}
