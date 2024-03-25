import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Overlay, InfoPanel } from '@components/ui';
import { CallToAction } from '..';
import { DefaultAdaptiveImageSkeleton } from '../AdaptiveImage';

export interface SimpleBannerBynderProps {
    bynder: {
        additionalInfo: {
            selectedFile: {
                url: string;
            };
        };
        originalUrl: string;
        name: string;
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

const SimpleBannerBynder = ({
    bynder,
    bannerText,
    ctaSettings,
    opacity = 0.9,
    textPositioning = { textPositionHorizontal: 'right', textPositionVertical: 'middle' },
    ...other
}: SimpleBannerBynderProps) => {
    const [imageLoading, setImageLoading] = useState(true);
    const imageRef = useRef<any>();

    const handleImageLoaded = () => {
        setImageLoading(false);
    };

    const isOverlayVisible =
        bannerText?.header || bannerText?.subheader || bannerText?.description || ctaSettings?.buttonText;

    useEffect(() => {
        if (imageRef?.current?.complete && imageLoading) {
            setImageLoading(false);
        }
    }, [imageRef?.current?.complete, imageLoading]);

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
                    <img
                        style={{
                            width: '100%',
                            minHeight: '50%',
                        }}
                        src={bynder?.additionalInfo?.selectedFile?.url ?? bynder?.originalUrl}
                        ref={imageRef}
                        onLoad={() => handleImageLoaded()}
                        alt={bynder?.name}
                    />
                </Box>
            </Overlay>
        </Box>
    );
};

export default SimpleBannerBynder;
