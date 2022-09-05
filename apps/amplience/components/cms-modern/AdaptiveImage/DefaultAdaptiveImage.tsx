import React, { forwardRef } from 'react';
import AdaptiveImage, { AdaptiveImageProps } from './AdaptiveImage';
import AdaptiveImageSource from './AdaptiveImageSource';
import { ImageFormat } from '@utils/getImageURL';

const DefaultAdaptiveImage: React.SFC<Omit<AdaptiveImageProps, 'children'>> = (props) => {
    const {imageRef} = props;
    return (
        <AdaptiveImage ref={imageRef} {...props}>
            <AdaptiveImageSource
                media="(min-width: 1280px)"
                type="image/webp"
                transformations={{
                    format: ImageFormat.WEBP,
                    width: 1600,
                    aspectRatio: '2:1'
                }} />
            <AdaptiveImageSource
                media="(min-width: 1280px)"
                transformations={{
                    width: 1600,
                    aspectRatio: '2:1'
                }} />
            <AdaptiveImageSource
                media="(min-width: 1024px)"
                type="image/webp"
                transformations={{
                    format: ImageFormat.WEBP,
                    width: 1280,
                    aspectRatio: '2:1'
                }} />
            <AdaptiveImageSource
                media="(min-width: 1024px)"
                transformations={{
                    width: 1280,
                    aspectRatio: '2:1'
                }} />
            <AdaptiveImageSource
                media="(min-width: 768px)"
                type="image/webp"
                transformations={{
                    format: ImageFormat.WEBP,
                    width: 1024,
                    aspectRatio: '1.5:1'
                }} />
            <AdaptiveImageSource
                media="(min-width: 768px)"
                transformations={{
                    width: 1024,
                    aspectRatio: '1.5:1'
                }} />
            <AdaptiveImageSource
                media="(max-width: 768px)"
                type="image/webp"
                transformations={{
                    format: ImageFormat.WEBP,
                    width: 768,
                    aspectRatio: '1:1'
                }} />
            <AdaptiveImageSource
                media="(max-width: 768px)"
                transformations={{
                    width: 768,
                    aspectRatio: '1:1'
                }} />
        </AdaptiveImage>
    );
};

const DefaultAdaptiveImageRef = forwardRef((props:AdaptiveImageProps, ref:any) => <DefaultAdaptiveImage imageRef={ref} {...props} />);
export default DefaultAdaptiveImageRef