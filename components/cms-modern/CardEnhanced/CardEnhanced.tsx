import React, { FC, useEffect, useRef, useState } from 'react'
import { CmsContent } from '@lib/cms/CmsContent';
import clsx from 'clsx';
import { CallToAction } from '@components/cms-modern';
import { Theme, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import { ImageTransformations, ImageScaleFit, ImageScaleMode } from '@utils/getImageURL';
import { DefaultAdaptiveImageSkeleton, TrueAdaptiveImage } from '../AdaptiveImage';

const styles = (theme: Theme) => ({
    root: {},
    image: {
        width: "100%",
    },
    tile: {
        position: 'relative' as 'relative',
        margin: 0,
        display: 'block',
        '& img': {
            filter: 'grayscale(0%)',
            transition: 'all 0.8s ease'
        },
        '&:hover': {
            '& img': {
                filter: 'grayscale(100%)'
            },
            '& .hover': {
                opacity: 1
            }
        }
    },
    tileText: {
        position: 'absolute' as 'absolute',
        display: 'table',
        top: 0,
        left: 0,
        padding: '20px',
        width: '100%',
        height: '100%',
        transition: 'all 0.8s ease',
        '&.hover': {
            opacity: 0
        },
        '&.blend': {
            opacity: 1
        },
        '&.t-left': {
            textAlign: 'left'
        },
        '&.t-right': {
            textAlign: 'right'
        },
        '&.t-center': {
            textAlign: 'center'
        },
        '& .text-cell': {
            display: 'table-cell',
            '& .t-pane': {
                display: 'inline-block',
                width: '50%'
            },
            '& h2': {
                fontSize: '22px'
            },
            '& p': {
                textTransform: 'capitalize',
                fontSize: '17px'
            },
            '& .link-text': {
                textTransform: 'uppercase',
                fontSize: '13px',
                fontWeight: 'bold'
            },
            '&.v-top': {
                verticalAlign: 'top'
            },
            '&.v-middle': {
                verticalAlign: 'middle'
            },
            '&.v-bottom': {
                verticalAlign: 'bottom'
            },
            '&.f-normal': {
                mixBlendMode: 'normal'
            },
            '&.f-overlay': {
                mixBlendMode: 'overlay'
            },
            '&.f-difference': {
                mixBlendMode: 'difference'
            },
            '&.f-exclusion': {
                mixBlendMode: 'exclusion'
            }
        }
    }
});

interface Window {
    drawAmpImageMeta(): void;
}

export type Link = {
    label: string;
    type: string;
    value: string;
}

type Props = {
    index?: number;
    onImageLoad?: Function;
    transformations?: ImageTransformations;
} & CmsContent;

const CardEnhanced: FC<Props> = ({
    style,
    classes,
    index = 0,
    onImageLoad,
    links = [],
    image,
    mainText,
    subText,
    textAlignment,
    verticalAlignment,
    linkPosition,
    blend,
    color,
    link,
    transformations,
    ...other
}) => {

    const [imageLoading, setImageLoading] = useState(true);
    const imageRef = useRef<any>();

    const handleImageLoaded = () => {
        setImageLoading(false);
        if (onImageLoad instanceof Function) {
            onImageLoad(index);
        }
    };

    useEffect(() => {
        if (imageRef?.current?.complete && imageLoading) {
            setImageLoading(false);
            { //@ts-ignore
                window['drawAmpImageMeta']();
            }
        }
    }, [imageRef?.current?.complete]);

    const { img } = image || {};

    transformations ? transformations : {
        ...img?.image,
        upscale: false,
        strip: true,
        quality: 80,
        scaleMode: !image?.disablePoiAspectRatio
            ? ImageScaleMode.ASPECT_RATIO
            : undefined,
        scaleFit: !image?.disablePoiAspectRatio
            && img?.image?.poi
            && img?.image?.poi.x != -1
            && img?.image?.poi.y != -1
            ? ImageScaleFit.POINT_OF_INTEREST
            : undefined,
    };

    //console.log(transformations);

    const content = <>

        {imageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
        <div className="img-place" style={{ display: `${imageLoading ? "none" : "block"}` }}>
            <TrueAdaptiveImage
                ref={imageRef}
                onLoad={() => handleImageLoaded()}
                image={img?.image.image}
                transformations={transformations}
                className={classes.image}
            />
        </div>

        <div className={clsx(classes.tileText, 't-' + textAlignment, 'blend', {
            ['amp-dc-hide']: !mainText && !subText && !links[0],
            ['amp-dc-card-no-image']: !image
        })}>
            <div className={`${clsx('text-cell', 'v-' + verticalAlignment, 'f-' + blend)}`} style={{ color: color }}>
                <div className="t-pane">
                    {
                        mainText ? (
                            <Typography component="h2" variant="h2" style={{ color: color }}>
                                {mainText}
                            </Typography>
                        ) : null
                    }
                    {
                        subText ? (
                            <p className="amp-dc-card-description" style={{ color: color }}>{subText}</p>
                        ) : null
                    }
                    {
                        links.map((link: any) => {
                            if (link.label) {
                                return (
                                    <CallToAction key={Math.random().toString(36).substr(2, 9)} href={link.value} variant="contained" className="amp-dc-card-link">
                                        {link.label}
                                    </CallToAction>
                                )
                            } else {
                                return null;
                            }
                        })
                    }
                </div>
            </div>
        </div>
        <div className={clsx(classes.tileText, 't-' + textAlignment, 'hover', {
            ['amp-dc-hide']: !mainText && !subText && !links[0],
            ['amp-dc-card-no-image']: !image
        })}>
            <div className={`${clsx('text-cell', 'v-' + verticalAlignment)}`} style={{ color: color }}>
                <div className="t-pane">
                    {
                        mainText ? (
                            <Typography component="h2" variant="h2" style={{ color: color }}>
                                {mainText}
                            </Typography>
                        ) : null
                    }
                    {
                        subText ? (
                            <p className="amp-dc-card-description" style={{ color: color }}>{subText}</p>
                        ) : null
                    }
                    {
                        links.map((link: any) => {
                            if (link.label) {
                                return (
                                    <CallToAction key={Math.random().toString(36).substr(2, 9)} href={link.value} variant="contained" className="amp-dc-card-link">
                                        {link.label}
                                    </CallToAction>
                                )
                            } else {
                                return null;
                            }
                        })
                    }
                </div>
            </div>
        </div>
    </>;

    return (
        links[0] ? (
            <a className={`${clsx(classes.tile)} amp-tile amp-tile-${index + 1} ${style || ''}`} href={links[0]?.value}>
                {content}
            </a>
        ) : (
            <div className={`${clsx(classes.tile)} amp-tile amp-tile-${index + 1} ${style || ''}`}>
                {content}
            </div>
        )
    )
}

export default withStyles(styles)(CardEnhanced);
