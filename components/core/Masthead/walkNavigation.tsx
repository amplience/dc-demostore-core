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
        case 'https://demostore.amplience.com/site/pages/ecomm-category-placeholder':
            return 'ecomm-category-placeholder';
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
            active: options?.active ?? true,
            menu: {
                hidden: false,
            },
            name: id,
        },
        children: children.map((child) => generateCmsCategory(child)),
    };
}

export function enrichHierarchyNodes(rootCmsNode: CmsHierarchyNode, categoriesById: CategoryById): CmsHierarchyNode {
    const ecommCategoriesEnabled = Boolean(rootCmsNode.content?.ecommCategories);
    const enrichedRootNodeChildren = rootCmsNode.children.reduce((cmsNodes: CmsHierarchyNode[], childNode) => {
        const childNodeType = getTypeFromSchema(childNode.content?._meta?.schema);
        if (ecommCategoriesEnabled && childNodeType === 'ecomm-category-placeholder') {
            const enrichedChildNodes = childNode.content.name.map((n: string) => {
                return enrichHierarchyNodes(
                    generateCmsCategory(categoriesById[n], {
                        active: childNode.content?.active,
                    }),
                    categoriesById,
                );
            });
            return [...cmsNodes, ...enrichedChildNodes];
        }
        if (ecommCategoriesEnabled && childNodeType === 'category') {
            childNode.children = categoriesById[childNode.content.name]?.children.map((child) =>
                generateCmsCategory(child),
            );
            return [...cmsNodes, childNode];
        }
        return [...cmsNodes, enrichHierarchyNodes(childNode, categoriesById)];
    }, []);

    return { content: rootCmsNode.content, children: enrichedRootNodeChildren };
}
