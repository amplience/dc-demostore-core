import { CmsHierarchyNode } from '@lib/cms/fetchHierarchy';
import { NavigationItem } from './NavigationContext';

export default function walkNavigation(
    current: NavigationItem,
    visitor: (item: NavigationItem, parents: NavigationItem[]) => void,
    parents: NavigationItem[] = []
) {
    visitor(current, parents);
    for (let child of current.children) {
        walkNavigation(child, visitor, [...parents, current]);
    }
}

export function walkNavigationItems(
    items: NavigationItem[],
    visitor: (item: NavigationItem, parents: NavigationItem[]) => void
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
    }
    return null;
}

export function enrichCmsEntries(cmsEntry: CmsHierarchyNode, categoriesById: any, categories: any) {
    // Generate fake cms entries for categories that exist on the backend,
    // are flagged as being visible in menu, and don't have an existing cms entry.

    const myType = getTypeFromSchema(cmsEntry.content?._meta?.schema);

    if (!cmsEntry.content.ecommCategories) {
        categories = null;
    } else if (categories == null && myType === 'category') {
        // Locate the category by ID.

        categories = categoriesById[cmsEntry.content.name]?.children;
    }

    if (categories == null) {
        for (const child of cmsEntry.children) {
            enrichCmsEntries(child, categoriesById, null);
        }
    } else {
        const children = cmsEntry.children;
        const remainingChildren = [...children];

        let generated = 0;
        for (const category of categories) {
            // Does a CMS category exist for this entry?

            let cmsChild = children.find((child) => {
                const type = getTypeFromSchema(child.content?._meta?.schema);
                if (!type) {
                    return false;
                }

                return type === 'category' && child.content.name === category.id;
            });

            let pushCount = 0;

            if (!cmsChild && category.showInMenu) {
                // Create a dummy one, if it's meant to be visible
                generated++;
                cmsChild = {
                    content: {
                        _meta: {
                            name: category.name,
                            schema: 'https://demostore.amplience.com/site/pages/category',
                            deliveryKey: 'category/' + category.slug,
                            hierarchy: {
                                parentId: 'generated',
                                root: false,
                            },
                            deliveryId: category.id,
                        },
                        ecommCategories: true,
                        hideProductList: false,
                        components: [],
                        slots: [],
                        active: true,
                        menu: {
                            hidden: false,
                            priority: generated * 10,
                        },
                        name: category.id,
                    },
                    children: [],
                };

                children.splice(pushCount++, 0, cmsChild);
            }

            if (cmsChild) {
                enrichCmsEntries(cmsChild, categoriesById, category.children);

                remainingChildren.splice(remainingChildren.indexOf(cmsChild), 1);
            }
        }

        for (const cmsChild of remainingChildren) {
            enrichCmsEntries(cmsChild, categoriesById, null);
        }
    }
}
