export function variableChunker<T>(arr: T[]): (size: number) => T[] {
    let offset = 0;
    return (size: number) => {
        const nextChunk = arr.slice(offset, offset + size);
        offset += size;
        return nextChunk;
    };
}
