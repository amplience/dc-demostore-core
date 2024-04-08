export type FetchMapInput<T> = {
    [key: string]: T | T[];
};

type FlatFetchFn<T, O> = (items: T[]) => Promise<O[]>;

type ExcludeMatchingProperties<T, V> = Pick<T, { [K in keyof T]-?: T[K] extends V ? never : K }[keyof T]>;

type RemapPropertyType<T, PT> = {
    [P in keyof T]: PT;
};

export type FetchMapOutput<T, I, O> = RemapPropertyType<ExcludeMatchingProperties<T, I[]>, O> &
    RemapPropertyType<ExcludeMatchingProperties<T, I>, O[]>;

/**
 * Utility for fetching references to data items in a Map and
 * returning the fetched values in the same structure as the Map
 *
 * @param input
 * @param fetchFn
 */
export async function fetchMap<T extends FetchMapInput<I>, I, O>(
    input: T,
    fetchFn: FlatFetchFn<I, O>,
): Promise<FetchMapOutput<T, I, O>> {
    const keys = Object.keys(input);
    const items: I[] = [];

    // deconstruct the structure into a flat list
    for (let key of keys) {
        if (Array.isArray(input[key])) {
            for (let item of input[key] as I[]) {
                items.push(item);
            }
        } else {
            items.push(input[key] as I);
        }
    }
    const fetchedItems = await fetchFn(items);

    // reconstruct into original object shape
    let result: any = {};
    for (let key of keys) {
        if (Array.isArray(input[key])) {
            result[key] = fetchedItems.splice(0, (input[key] as I[]).length);
        } else {
            result[key] = fetchedItems.shift();
        }
    }

    return result;
}
