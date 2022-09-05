import { CmsHierarchyNode } from "@lib/cms/fetchHierarchy";

export type FindInHierarchyOutput = CmsHierarchyNode & { breadcrumb: CmsHierarchyNode[] };

export function findInHierarchy(root: CmsHierarchyNode, findFn: (node: CmsHierarchyNode) => boolean): FindInHierarchyOutput | null {
    const visit = (node: CmsHierarchyNode, stack: CmsHierarchyNode[]): FindInHierarchyOutput | null => {
        if (!node) {
            return null;
        }

        if (findFn(node)) {
            return {
                ...node,
                breadcrumb: stack
            };
        } else {
            for (let child of node.children || []) {
                const value = visit(child, stack.concat(node));
                if (value) {
                    return {
                        ...value,
                        breadcrumb: stack
                    };
                }
            }
        }

        return null;
    }
    return visit(root, []);
}