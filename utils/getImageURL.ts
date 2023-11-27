import { useAcceleratedMedia } from "@components/admin/AdminPanel/context/AcceleratedMediaContext";

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
    AVIF = 'avif',
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

const avifMaxPixels = 2500000;

function limitSize(width: number, height: number, maxPixels: number): { width: number, height: number } | undefined {
    const pixels = width * height;

    if (pixels <= maxPixels) {
        return undefined;
    }
    
    const heightFromWidth = height / width;

    const newWidth = Math.floor(Math.sqrt(maxPixels / heightFromWidth));
    const newHeight = Math.floor(newWidth * heightFromWidth);

    return {
        width: newWidth,
        height: newHeight
    }
}

function constrainMaxSize(transformations: ImageTransformations, maxPixels: number): ImageTransformations {
    // Given a max number of pixels,
    // Constrain the size of the image, while also keeping its aspect ratio.
    // If it's not possible, leave it untouched.
    const aspect = transformations.aspectRatio;

    if (transformations.width == null && transformations.height == null) {
        return transformations;
    }

    // Both dimensions can be controlled.
    if (transformations.width != null && transformations.height != null) {
        const newSize = limitSize(transformations.width, transformations.height, maxPixels);

        return (newSize == null) ? transformations : {
            ...transformations,
            width: newSize.width,
            height: newSize.height
        };
    }

    // Can only control scale if we know the aspect.
    if (aspect == null) {
        return transformations;
    }

    const aspectSplit = aspect.split(':');
    const widthFromHeight = Number(aspectSplit[0])/Number(aspectSplit[1]);
    const heightFromWidth = 1/widthFromHeight;

    if (isNaN(widthFromHeight)) {
        return transformations;
    }

    if (transformations.width != null) {
        // Scale the width to be within the maxPixels.
        const newSize = limitSize(transformations.width, transformations.width * heightFromWidth, maxPixels);

        return (newSize == null) ? transformations : {
            ...transformations,
            width: newSize.width
        };
    } else if (transformations.height != null) {
        // Height must be defined instead.
        const newSize = limitSize(transformations.height * widthFromHeight, transformations.height, maxPixels);

        return (newSize == null) ? transformations : {
            ...transformations,
            height: newSize.height
        };
    }

    // Not really possible to get here, but typescript doesn't know that.
    return transformations;
}

export function getImageURL(image: string | CmsImage, transformations: ImageTransformations = {}, removeAllParams = false, diParams: String = ""): string {
    transformations = constrainMaxSize(transformations, avifMaxPixels);

    const {
        seoFileName,
        format = ImageFormat.DEFAULT,
        width,
        height,
        poi,
        scaleMode,
        scaleFit,
        aspectRatio,
        upscale = false,
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

    const {
        acceleratedMedia
    } = useAcceleratedMedia();

    let finalFormat = format
    if (acceleratedMedia) finalFormat = ImageFormat.AVIF

    let url = typeof image === 'string' ? image :
        `https://${image.defaultHost}/i/${encodeURIComponent(image.endpoint)}/${encodeURIComponent(image.name)}`;

    if (seoFileName) {
        url += `/${encodeURIComponent(seoFileName)}`;
    }

    // Remove all existing URL parameters
    if (removeAllParams && url.indexOf('?') > -1) {
        url = url.split('?')[0]
    }

    const query: string[] = [];

    // Get parameters from Transformations
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

    // Re-add existing parameters from URL
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    let match;
    while ((match = regex.exec(url))) {
        if (params[match[1]] == undefined || params[match[1]] == null) params[match[1]] = match[2]
    }

    // Add all parameters to query
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

    // Add format and quality
    query.push(`fmt=${finalFormat}`)
    query.push('qlt=default')

    // Set max sizes
    if (params['h'] == null && params['w'] == null) {
        query.push('maxH=1500')
        query.push('maxW=1500')
    }

    // Rebuild URL
    if (url.indexOf('?') > -1) {
        url = url.split('?')[0]
    }
    url += `?${query.join('&')}`;

    // Add the additional DI Params
    if(diParams){
        //check to add an ampersand first
        if( diParams.charAt(0) != "&"){
            diParams = "&" + diParams
        }
        url += diParams;
    }

    return url;
}