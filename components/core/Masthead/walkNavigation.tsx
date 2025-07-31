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

export function generateCmsCategory(
    { id, name, slug, children }: Category,
    options?: { active: boolean },
): CmsHierarchyNode {
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
            active: options?.active ?? true,
            menu: {
                hidden: false,
            },
            categoryId: id,
        },
        children: children.map((child) => generateCmsCategory(child)),
    };
}

export function enrichHierarchyNodes(
    rootCmsNode: CmsHierarchyNode,
    categoriesById: CategoryById,
    categories: Category[],
): CmsHierarchyNode {
    const enrichedRootNodeChildren = rootCmsNode.children.reduce((cmsNodes: CmsHierarchyNode[], childNode) => {
        const childNodeType = getTypeFromSchema(childNode.content?._meta?.schema);
        if (childNodeType === 'ecommerce-container') {
            const categoryIds: string[] = childNode.content?.ecommerceConfiguration?.showAll
                ? categories.map((category) => category.id)
                : childNode.content?.ecommerceConfiguration?.categoryIds;
            const enrichedChildNodes = (categoryIds || []).map((categoryId) => {
                return enrichHierarchyNodes(
                    generateCmsCategory(categoriesById[categoryId], {
                        active: childNode.content?.active,
                    }),
                    categoriesById,
                    categories,
                );
            });
            return [...cmsNodes, ...enrichedChildNodes];
        }
        if (childNodeType === 'category') {
            childNode.children = categoriesById[childNode.content.categoryId]?.children.map((child) =>
                generateCmsCategory(child),
            );
            return [...cmsNodes, childNode];
        }
        return [...cmsNodes, enrichHierarchyNodes(childNode, categoriesById, categories)];
    }, []);

    return { content: rootCmsNode.content, children: enrichedRootNodeChildren };
}
