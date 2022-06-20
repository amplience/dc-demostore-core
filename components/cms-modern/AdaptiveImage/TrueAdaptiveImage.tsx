import React, { forwardRef, useMemo } from 'react';
import AdaptiveImage, { AdaptiveImageProps } from './AdaptiveImage';
import AdaptiveImageSource from './AdaptiveImageSource';
import { ImageFormat } from '@utils/getImageURL';

const TrueAdaptiveImage: React.FC<Omit<AdaptiveImageProps, 'children'>> = (props) => {
    const {
        imageRef,
        transformations
    } = props;

    const [xl, xlNorm, l, lNorm, t, tNorm, m, mNorm] = useMemo(() => {
        return [
            transformations ? {
                format: ImageFormat.WEBP,
                transformations
            } : {
                format: ImageFormat.WEBP,
                width: 1600,
                aspectRatio: '2:1'
            },
            transformations ? {
                transformations
            } : {
                width: 1600,
                aspectRatio: '2:1'
            },
            transformations ? {
                format: ImageFormat.WEBP,
                width: transformations.width ? Math.floor(transformations.width / 1.25 ) : undefined,
                height: transformations.height ? Math.floor( transformations.height / 1.25 ) : undefined,
                transformations
            } : {
                format: ImageFormat.WEBP,
                width: 1280,
                aspectRatio: '2:1'
            },
            transformations ? {
                width: transformations.width ? Math.floor(transformations.width / 1.25) : undefined,
                height: transformations.height ? Math.floor(transformations.height / 1.25) : undefined,
                transformations
            } : {
                width: 1280,
                aspectRatio: '2:1'
            },
            transformations ? {
                format: ImageFormat.WEBP,
                width: transformations.width ? Math.floor(transformations.width / 1.56) : undefined,
                height: transformations.height ? Math.floor(transformations.height / 1.56) : undefined,
                transformations
            } : {
                format: ImageFormat.WEBP,
                width: 1024,
                aspectRatio: '2:1'
            },
            transformations ? {
                width: transformations.width ? Math.floor(transformations.width / 1.56) : undefined,
                height: transformations.height ? Math.floor(transformations.height / 1.56) : undefined,
                transformations
            } : {
                width: 1024,
                aspectRatio: '2:1'
            },
            transformations ? {
                format: ImageFormat.WEBP,
                width: transformations.width ? Math.floor(transformations.width / 2.125) : undefined,
                height: transformations.height ? Math.floor(transformations.height / 2.125) : undefined,
                transformations
            } : {
                format: ImageFormat.WEBP,
                width: 768,
                aspectRatio: '2:1'
            },
            transformations ? {
                width: transformations.width ? Math.floor(transformations.width / 2.125) : undefined,
                height: transformations.height ? Math.floor(transformations.height / 2.125) : undefined,
                transformations
            } : {
                width: 768,
                aspectRatio: '2:1'
            }
        ]
    }, []);

    console.log(xl);

    return (
        <AdaptiveImage ref={imageRef} {...props}>
            <AdaptiveImageSource
                media="(min-width: 1280px)"
                type="image/webp"
                transformations={xl} />
            <AdaptiveImageSource
                media="(min-width: 1280px)"
                transformations={xlNorm} />
            <AdaptiveImageSource
                media="(min-width: 1024px)"
                type="image/webp"
                transformations={l} />
            <AdaptiveImageSource
                media="(min-width: 1024px)"
                transformations={lNorm} />
            <AdaptiveImageSource
                media="(min-width: 768px)"
                type="image/webp"
                transformations={t} />
            <AdaptiveImageSource
                media="(min-width: 768px)"
                transformations={tNorm} />
            <AdaptiveImageSource
                media="(max-width: 768px)"
                type="image/webp"
                transformations={m} />
            <AdaptiveImageSource
                media="(max-width: 768px)"
                transformations={mNorm} />
        </AdaptiveImage>
    );
};

export default forwardRef((props:AdaptiveImageProps, ref:any) => <TrueAdaptiveImage imageRef={ref} {...props} />);

