export interface ImageStatistics {
    src: string;
    name: string;
    types: { [key: string]: string }
    sizes: { [key: string]: number }
    auto: string;
    completed: number,
    total: number
}

const formatTests = ['auto', 'jpeg', 'webp', 'avif']; // png deliberately excluded

export const typeFromFormat: { [key: string]: string } = {
    'image/webp': 'webp',
    'image/jpeg': 'jpeg',
    'image/avif': 'avif',
    'image/png': 'png'
};


export function isValid(stat: ImageStatistics, key: string): boolean {
    let type = stat.types[key];
    let realKey = typeFromFormat[type] ?? key;
  
    return key === 'auto' || key === realKey;
}

export function hasInvalid(stat: ImageStatistics): boolean {
    for (const key of Object.keys(stat.sizes)) {
        if (!isValid(stat, key)) {
            return true;
        }
    }

    return false;
}

export async function DetermineImageSizes(onChange: (stats: ImageStatistics[]) => void) {
    const images = Array.from(document.images);

    const uniqueSrc = new Set<string>();
    const result: ImageStatistics[] = [];

    const promises: Promise<any>[] = [];

    for (const image of images) {
        const src = image.currentSrc;

        if (uniqueSrc.has(src)) {
            continue;
        }

        uniqueSrc.add(src);

        try {
            const url = new URL(src);

            const isAmplienceRequest = url.pathname.startsWith('/i/') || url.pathname.startsWith('/s/');
            const accountName = url.pathname.split('/')[2];

            if (isAmplienceRequest) {
                const imageResult: ImageStatistics = {
                    src,
                    name: url.pathname.split('/')[3],
                    types: {},
                    sizes: {},
                    completed: 0,
                    auto: 'none',
                    total: formatTests.length
                }

                result.push(imageResult);

                onChange(result);

                const formatPromises = formatTests.map(async format => {
                    url.searchParams.set('fmt', format);

                    const src = url.toString();

                    try {
                        const response = await fetch(src);

                        const headLength = response.headers.get("content-length");
                        const size = headLength ? Number(headLength) : (await response.arrayBuffer()).byteLength;

                        imageResult.sizes[format] = size;
                        imageResult.types[format] = response.headers.get("content-type") ?? '';
                        imageResult.completed++;

                        if (format === 'auto') {
                            imageResult.auto = typeFromFormat[imageResult.types[format]] ?? 'none'
                        }

                        onChange(result);
                    } catch (e) {
                        console.log(`Could not scan image ${image.currentSrc}`);
                    }
                });

                promises.push(...formatPromises);
            }
        } catch (e) {
            console.log(`Not a valid URL ${image.currentSrc}`);
        }
    }

    onChange(result);

    await Promise.all(promises);

    return result;
}