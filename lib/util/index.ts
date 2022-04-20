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