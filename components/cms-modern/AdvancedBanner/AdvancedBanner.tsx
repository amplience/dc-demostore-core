import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { CmsImage, ImageScaleMode, ImageTransformations, ImageScaleFit } from '@utils/getImageURL';
import DefaultAdaptiveImage from '../AdaptiveImage/DefaultAdaptiveImage';
import { Overlay, InfoPanel } from '@components/ui';
import { CallToAction } from '..';
import { DefaultAdaptiveImageSkeleton } from '../AdaptiveImage';

export interface AdvancedBannerProps {
    image: {
        img: {
            image: ImageTransformations & {
                image: CmsImage;
            };
        };
        disablePoiAspectRatio: boolean;
        imageAltText: string;
    };
    bgcol?: string;
    textLines?: [
        {
            text: string;
            variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
            col: string;
        },
    ];
    overlaypanel?: {
        opacity?: number;
        col?: string;
        borderStyle?: string;
        offsetH?: string;
        offsetV?: string;
        w?: number;
    };
    ctas?: [
        {
            buttonText: string;
            linkUrl: string;
            variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
        },
    ];
    disclaimer?: {
        text: string;
        col: string;
        variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
        align: 'left' | 'center' | 'right' | 'inherit' | 'justify';
        fontFamily: string;
    };
    textPositioning: {
        textPositionHorizontal: 'left' | 'center' | 'right';
        textPositionVertical: 'top' | 'middle' | 'bottom';
    };
}

const AdvancedBanner = ({
    image,
    bgcol,
    textLines,
    ctas,
    overlaypanel,
    textPositioning = {
        textPositionHorizontal: 'left',
        textPositionVertical: 'middle',
    },
    disclaimer,
    ...other
}: AdvancedBannerProps) => {
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
    const isOverlayVisible = textLines?.length || ctas?.length || disclaimer?.text;
    var edgePercHoriz = overlaypanel?.offsetH || '0';
    var edgePercVertical = overlaypanel?.offsetV || '0';
    var panelwidth = overlaypanel?.w ? overlaypanel?.w + 'px' : null;
    var edgepadStyle = {
        right: '',
        left: '',
        top: '',
        bottom: '',
        width: panelwidth,
    };
    if (textPositioning?.textPositionHorizontal === 'right') {
        edgepadStyle.right = edgePercHoriz;
    }
    if (textPositioning?.textPositionHorizontal === 'left') {
        edgepadStyle.left = edgePercHoriz;
    }
    if (textPositioning?.textPositionVertical === 'top') {
        edgepadStyle.top = edgePercVertical;
    }
    if (textPositioning?.textPositionVertical === 'bottom') {
        edgepadStyle.bottom = edgePercVertical;
    }
    var newCSS = edgepadStyle as React.CSSProperties;

    return (
        <div {...other} style={{ backgroundColor: bgcol ? bgcol : 'white' }}>
            <Overlay
                variant="responsive"
                floatingHorizontalAlignment={textPositioning?.textPositionHorizontal}
                floatingVerticalAlignment={textPositioning?.textPositionVertical}
                overlayStyle={newCSS}
                overlay={
                    isOverlayVisible ? (
                        <InfoPanel
                            style={{ maxWidth: '100%' }}
                            variant="absolute"
                            opacity={overlaypanel?.opacity}
                            col={overlaypanel?.col}
                            borderStyle={overlaypanel?.borderStyle}
                        >
                            {textLines?.map((line: any, index: number) => {
                                return (
                                    <Typography
                                        key={index}
                                        variant={line.variant}
                                        align={line.align}
                                        component="h1"
                                        style={{ color: line.col, fontFamily: line.fontFamily, whiteSpace: 'pre-wrap' }}
                                    >
                                        {line.text}
                                    </Typography>
                                );
                            })}
                            {ctas?.map((cta: any) => {
                                return (
                                    <CallToAction
                                        key={cta?.buttonText}
                                        href={cta?.linkUrl}
                                        style={{ marginTop: '15px !important', marginRight: '15px !important' }}
                                        variant={cta?.variant}
                                    >
                                        {cta?.buttonText}
                                    </CallToAction>
                                );
                            })}
                        </InfoPanel>
                    ) : null
                }
            >
                {imageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
                <div style={{ display: `${imageLoading ? 'none' : 'block'}` }}>
                    <DefaultAdaptiveImage
                        ref={imageRef}
                        onLoad={() => handleImageLoaded()}
                        image={img?.image.image}
                        imageAltText={image?.imageAltText}
                        transformations={transformations}
                        style={{ width: '100%' }}
                    />
                </div>
                <Typography
                    variant={disclaimer?.variant}
                    align={disclaimer?.align}
                    component="h1"
                    style={{
                        color: disclaimer?.col,
                        position: 'absolute',
                        bottom: '5px',
                        width: '100%',
                        fontFamily: disclaimer?.fontFamily,
                    }}
                >
                    {disclaimer?.text}
                </Typography>
            </Overlay>
        </div>
    );
};

export default AdvancedBanner;
