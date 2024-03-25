import React, { useEffect, useRef, useState } from 'react';
import { Box, Theme, Typography } from '@mui/material';
import { CmsImage, ImageScaleMode, ImageTransformations, ImageScaleFit } from '@utils/getImageURL';
import DefaultAdaptiveImage from '../AdaptiveImage/DefaultAdaptiveImage';
import { Overlay, InfoPanel } from '@components/ui';
import { CallToAction } from '..';
import { DefaultAdaptiveImageSkeleton } from '../AdaptiveImage';

// TODO: migrate styles
const styles = (theme: Theme) => ({
    overlay: {
        [theme.breakpoints.down('md')]: {
            position: 'unset !important',
            background: 'red',
        },
    },
});

export interface SimpleBannerProps {
    image: {
        img: {
            image: ImageTransformations & {
                image: CmsImage;
            };
        };
        disablePoiAspectRatio: boolean;
        imageAltText: string;
        di: string;
    };
    bannerText: {
        header: string;
        subheader?: string;
        description: string;
    };
    opacity?: number;
    ctaSettings: {
        linkUrl: string;
        buttonText: string;
    };
    textPositioning: {
        textPositionHorizontal: 'left' | 'center' | 'right';
        textPositionVertical: 'top' | 'middle' | 'bottom';
    };
}

const SimpleBanner = ({
    image,
    bannerText,
    ctaSettings,
    opacity = 0.9,
    textPositioning = { textPositionHorizontal: 'right', textPositionVertical: 'middle' },
    ...other
}: SimpleBannerProps) => {
    const [imageLoading, setImageLoading] = useState(true);
    const imageRef = useRef<any>();

    const handleImageLoaded = () => {
        setImageLoading(false);
    };

    useEffect(() => {
        if (imageRef?.current?.complete && imageLoading) {
            setImageLoading(false);
        }
    }, [imageRef?.current?.complete, imageLoading]);

    const { img } = image || {};

    const transformations: ImageTransformations = {
        ...img?.image,
        upscale: false,
        strip: true,
        quality: 80,
        scaleMode: !image?.disablePoiAspectRatio ? ImageScaleMode.ASPECT_RATIO : undefined,
        scaleFit:
            !image?.disablePoiAspectRatio && img?.image?.poi && img?.image?.poi.x != -1 && img?.image?.poi.y != -1
                ? ImageScaleFit.POINT_OF_INTEREST
                : undefined,
    };

    const isOverlayVisible =
        bannerText?.header || bannerText?.subheader || bannerText?.description || ctaSettings?.buttonText;

    return (
        <Box {...other}>
            <Overlay
                variant="responsive"
                floatingHorizontalAlignment={textPositioning?.textPositionHorizontal}
                floatingVerticalAlignment={textPositioning?.textPositionVertical}
                overlay={
                    isOverlayVisible ? (
                        <InfoPanel variant="absolute" opacity={opacity}>
                            <Typography variant="h1" component="h1">
                                {bannerText?.header}
                            </Typography>
                            <Typography
                                variant="h5"
                                component="h5"
                                style={{ color: 'inherit', fontFamily: "'Roboto', sans-serif", fontSize: '14px' }}
                            >
                                {bannerText?.subheader}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="p"
                                style={{
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    color: 'inherit',
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}
                            >
                                {bannerText?.description}
                            </Typography>
                            <CallToAction href={ctaSettings?.linkUrl} style={{ marginTop: 15 }} variant="contained">
                                {ctaSettings?.buttonText}
                            </CallToAction>
                        </InfoPanel>
                    ) : null
                }
            >
                {imageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
                <Box style={{ display: `${imageLoading ? 'none' : 'block'}` }}>
                    <DefaultAdaptiveImage
                        ref={imageRef}
                        onLoad={() => handleImageLoaded()}
                        image={img?.image.image}
                        imageAltText={image?.imageAltText}
                        transformations={transformations}
                        diParams={image?.di}
                        style={{ width: '100%', minHeight: '50%' }}
                    />
                </Box>
            </Overlay>
        </Box>
    );
};

export default SimpleBanner;
