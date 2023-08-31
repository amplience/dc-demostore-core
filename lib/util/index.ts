import { useEffect } from "react";

// custom Hook for automatic abortion on unmount or dependency change
// You might add onFailure for promise errors as well.
export const useAsync = (asyncFn: any, onSuccess: any) => {
    useEffect(() => {
        let isActive = true;
        asyncFn().then((data: any) => {
            if (isActive) onSuccess(data)
            else {
                console.debug("aborted setState on unmounted component")
            }
        });
        return () => { isActive = false }
    }, [asyncFn, onSuccess])
}

export const notNull = (x: any) => x != null
export const mapToID = (x: any) => ({ id: x.id })

const sizeof = require('object-sizeof')
export function objectToSize(obj: any) {
    const bytes = sizeof(obj)
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10)
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

type TreeNode = { [key: string]: TreeNode | null | undefined } | Array<TreeNode | null | undefined>

/**
 * Deletes undefined properties and nullifies undefined array items.
 * Useful to perform before JSON stringify.
 * Only use if the object structure is not recursive.
 */
export function clearUndefined(root: TreeNode) {
    if (root != null) {
        if (Array.isArray(root)) {
            for (let i = 0; i < root.length; i++) {
                const child = root[i];
                if (child == null) {
                    root[i] = null;
                } else {
                    clearUndefined(child);
                }
            }
        } else if (typeof root === 'object') {
            const keys = Object.keys(root);

            for (const key of keys) {
                const child = root[key];

                if (child == null) {
                    if (child === undefined) {
                        delete root[key];
                    }
                } else {
                    clearUndefined(child);
                }
            }
        }
    }

    return root;
}