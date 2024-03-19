export function measurePromiseDuration<T>(name: string, input: Promise<T>): Promise<T> {
    const start = new Date().getTime();
    input.then(() => {
        //console.log(`[promise][${name}] took ${new Date().getTime() - start}`);
    });
    return input;
}
