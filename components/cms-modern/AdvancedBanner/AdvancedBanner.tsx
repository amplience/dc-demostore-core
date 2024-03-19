import React, { useEffect, useRef, useState } from 'react';
import { Theme, Typography } from '@mui/material';
import { CmsImage, ImageScaleMode, ImageTransformations, ImageScaleFit } from '@utils/getImageURL';
import DefaultAdaptiveImage from '../AdaptiveImage/DefaultAdaptiveImage';
import { Overlay, InfoPanel } from '@components/ui';
import { CallToAction } from '..';
import { DefaultAdaptiveImageSkeleton } from '../AdaptiveImage';
import { nanoid } from 'nanoid';

const styles = (theme: Theme) => ({
    root: {},
    image: {
        width: '100%',
    },
    imageleft: {
        width: '50%',
    },
    imageright: {
        width: '50%',
        marginLeft: '50%',
    },
    overlay: {
        [theme.breakpoints.down('md')]: {
            position: 'unset !important',
            background: 'red',
        },
    },
    infoPanel: {
        maxWidth: '100%',
    },
    header: {},
    subheader: {
        color: 'inherit',
        fontFamily: "'Roboto', sans-serif",
        fontSize: '14px',
    },
    description: {
        fontWeight: 400,
        fontSize: '16px',
        color: 'inherit',
        marginTop: 20,
        marginBottom: 20,
    },
    cta: {
        marginTop: '15px !important',
        marginRight: '15px !important',
    },
});

/**
 * AdvancedBanner Props
 */
export interface AdvancedBannerProps {
    classes?: any;

    /**
     * Image properties
     */
    image: {
        img: {
            image: ImageTransformations & {
                image: CmsImage;
            };
        };
        disablePoiAspectRatio: boolean;
        imageAltText: string;
    };

    /**
     * Background color
     */
    bgcol?: string;

    /**
     * Text lines
     */
    textLines?: [
        {
            text: string;
            variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
            col: string;
        }
    ];

    /**
     * Overlay panel configuration
     */
    overlaypanel?: {
        opacity?: number;
        col?: string;
        borderStyle?: string;
        offsetH?: string;
        offsetV?: string;
        w?: number;
    };

    /**
     * Call-to-actions configuration
     */
    ctas?: [
        {
            buttonText: string;
            linkUrl: string;
            variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
        }
    ];

    /**
     * Disclaimer text
     */
    disclaimer?: {
        text: string;
        col: string;
        variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
        align: 'left' | 'center' | 'right' | 'inherit' | 'justify';
        fontFamily: string;
    };

    /**
     * Horizontal and vertical text alignment
     */
    textPositioning: {
        textPositionHorizontal: 'left' | 'center' | 'right';
        textPositionVertical: 'top' | 'middle' | 'bottom';
    };
}

const AdvancedBanner = ({
    classes,
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

    const isOverlayVisible = true; //bannerText?.header || bannerText?.subheader || bannerText?.description || ctaSettings?.buttonText;

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
        <div className={classes?.root} {...other} style={{ backgroundColor: bgcol ? bgcol : 'white' }}>
            <Overlay
                variant="responsive"
                floatingHorizontalAlignment={textPositioning?.textPositionHorizontal}
                floatingVerticalAlignment={textPositioning?.textPositionVertical}
                overlayStyle={newCSS}
                overlay={
                    isOverlayVisible ? (
                        <InfoPanel
                            className={classes?.infoPanel}
                            variant="absolute"
                            opacity={overlaypanel?.opacity}
                            col={overlaypanel?.col}
                            borderStyle={overlaypanel?.borderStyle}
                        >
                            {textLines?.map((line: any) => {
                                return (
                                    <Typography
                                        key={nanoid()}
                                        variant={line.variant}
                                        align={line.align}
                                        component="h1"
                                        className={classes?.header}
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
                                        className={classes?.cta}
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
                        className={classes?.image}
                    />
                </div>
                <Typography
                    variant={disclaimer?.variant}
                    align={disclaimer?.align}
                    component="h1"
                    className={classes?.header}
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
