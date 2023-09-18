export type CmsImage = {
    defaultHost: string;
    name: string;
    endpoint: string;
};

export enum ImageFormat {
    WEBP = 'webp',
    JPEG = 'jpeg',
    PNG = 'png',
    GIF = 'gif',
    DEFAULT = 'default'
}

export enum ImageScaleMode {
    ASPECT_RATIO = 'aspect',
    CROP = 'c',
    STRETCH = 's',

    TOP_LEFT = 'tl',
    TOP_CENTER = 'tc',
    TOP_RIGHT = 'tr',

    MIDDLE_LEFT = 'ml',
    MIDDLE_CENTER = 'mc',
    MIDDLE_RIGHT = 'mr',

    BOTTOM_LEFT = 'bl',
    BOTTOM_CENTER = 'bc',
    BOTTOM_RIGHT = 'br'
}

export enum ImageScaleFit {
    CENTER = 'center',
    POINT_OF_INTEREST = 'poi'
}

export type ImageTransformations = {
    format?: ImageFormat;
    seoFileName?: string;

    width?: number;
    height?: number;

    quality?: number;

    poi?: { x: number, y: number };
    scaleMode?: ImageScaleMode;
    scaleFit?: ImageScaleFit;
    aspectRatio?: string;
    upscale?: boolean;

    fliph?: boolean;
    flipv?: boolean;

    rot?: number;
    hue?: number;
    sat?: number;
    bri?: number;
    crop?: number[];

    strip?: boolean;

    templates?: string[];
};

export function getImageURL(image: string | CmsImage, transformations: ImageTransformations = {}): string {

    const {
        seoFileName,
        format,
        width,
        height,
        poi,
        scaleMode,
        scaleFit,
        aspectRatio,
        upscale,
        fliph,
        flipv,
        rot,
        hue,
        sat,
        bri,
        crop,
        templates,
        strip,
        quality
    } = transformations;

    const getImageHost = (host: string) => {
        if (host === 'i1.adis.ws') {
            return 'cdn.media.amplience.net';
        }
        return host;
    }

    let url = typeof image === 'string' ? image :
        `https://${getImageHost(image.defaultHost)}/i/${encodeURIComponent(image.endpoint)}/${encodeURIComponent(image.name)}`;

    if (seoFileName) {
        url += `/${encodeURIComponent(seoFileName)}`;
    }

    const query: string[] = [];

    const params: any = {
        'w': width,
        'h': height,
        'sm': scaleMode,
        'scaleFit': scaleFit,
        'aspect': aspectRatio,
        'upscale': upscale,
        'fliph': fliph,
        'flipv': flipv,
        'rotate': rot,
        'hue': hue ? hue * 100 / 180 : null,
        'sat': sat,
        'bri': bri,
        'strip': strip,
        'qlt': quality
    };

    for (let param of Object.keys(params)) {
        const value = params[param];
        if (value !== undefined && value !== null && value != 0) {
            query.push(`${param}=${value}`);
        }
    }

    if (poi && poi.x !== -1 && poi.y !== -1) {
        query.push(`poi=${poi.x},${poi.y},0.01,0.01`);
    }

    if (crop && crop.length === 4 && crop.filter(x => x !== 0).length > 0) {
        query.push(`crop=${crop[0]},${crop[1]},${crop[2]},${crop[3]}`);
    }

    if (templates) {
        for (let template of templates) {
            query.push(`$${template}$`);
        }
    }

    query.push('fmt=webp')
    query.push('qlt=default')
    // query.push('fmt.jpeg.qlt=75')
    // query.push('fmt.webp.qlt=60')
    // query.push('fmt.jp2.qlt=40')
    // query.push('fmt.avif.qlt=60')

    if (query.length > 0) {
        if (url.indexOf('?') > -1) {
            url += `&${query.join('&')}`;
        } else {
            url += `?${query.join('&')}`;
        }
    }

    return url;
}