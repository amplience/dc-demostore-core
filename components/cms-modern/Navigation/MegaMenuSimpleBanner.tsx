import React from 'react';
import { CmsImage, ImageScaleMode, ImageTransformations, ImageFormat, ImageScaleFit } from '@utils/getImageURL';
import { Overlay } from '@components/ui';
import { CallToAction } from '..';
import AdaptiveImage, { AdaptiveImageSource } from '../AdaptiveImage';

interface Props {
    style?: React.CSSProperties;
    image: {
        img: {
            image: ImageTransformations & {
                image: CmsImage;
            };
        };
    };
    bannerText?: string;
    ctaSettings: {
        linkUrl: string;
        buttonText: string;
    };
    textPositioning: {
        textPositionHorizontal: 'left' | 'center' | 'right';
        textPositionVertical: 'top' | 'middle' | 'bottom';
    };
}

const MegaMenuSimpleBanner = (props: Props) => {
    const { image, ctaSettings, bannerText, textPositioning, ...other } = props;

    const { img } = image || {};

    const transformations: ImageTransformations = {
        ...img.image,
        upscale: false,
        strip: true,
        quality: 80,
        scaleMode: ImageScaleMode.ASPECT_RATIO,
        scaleFit:
            img.image.poi && img.image.poi.x != -1 && img.image.poi.y != -1
                ? ImageScaleFit.POINT_OF_INTEREST
                : undefined,
    };

    return (
        <div {...other}>
            <Overlay
                variant="responsive"
                floatingHorizontalAlignment={'center'}
                floatingVerticalAlignment={'middle'}
                overlay={
                    <CallToAction href={ctaSettings?.linkUrl} variant="contained">
                        {ctaSettings?.buttonText}
                    </CallToAction>
                }
            >
                <AdaptiveImage
                    style={{
                        width: '100%',
                    }}
                    image={img.image.image}
                    transformations={transformations}
                >
                    <AdaptiveImageSource
                        type="image/webp"
                        transformations={{
                            format: ImageFormat.WEBP,
                            width: 768,
                            aspectRatio: '1:1',
                        }}
                    />
                    <AdaptiveImageSource
                        transformations={{
                            width: 768,
                            aspectRatio: '1:1',
                        }}
                    />
                </AdaptiveImage>
            </Overlay>
        </div>
    );
};

export default MegaMenuSimpleBanner;
