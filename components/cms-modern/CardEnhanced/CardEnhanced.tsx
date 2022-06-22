import React, { FC, useEffect, useRef, useState } from 'react'
import { CmsContent } from '@lib/cms/CmsContent';
import clsx from 'clsx';
import { CallToAction } from '@components/cms-modern';
import { Theme, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import { ImageTransformations, ImageScaleFit, ImageScaleMode } from '@utils/getImageURL';
import { DefaultAdaptiveImageSkeleton, TrueAdaptiveImage } from '../AdaptiveImage';

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        /* border: '1px solid white',
        '&:hover': {
            border: '1px solid black'
        } */
    },
    image: {
        width: "100%",
    },
    tile: {
        height: '100%',
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
    cols: number;
    rows: number;
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
    cols,
    rows,
    ...other
}) => {

    const [imageLoading, setImageLoading] = useState(true);
    const imageRef = useRef<any>();

    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [ratio, setRatio] = useState('1:1')
    const parentRef = useRef<any>();

    const handleImageLoaded = () => {
        setImageLoading(false);
        if (onImageLoad instanceof Function) {
            onImageLoad(index);
        }
    };

    const gcd = (a: number, b: number): number => {
        return (b == 0) ? a : gcd(b, a%b);
    }

    useEffect(() => {
        if (imageRef?.current?.complete && imageLoading) {
            setImageLoading(false);
            { //@ts-ignore
                window['drawAmpImageMeta']();
            }
        }
    }, [imageRef?.current?.complete]);

    useEffect(() => {
        const h = parentRef.current?.clientHeight;
        const w = parentRef.current?.clientWidth;
        let r, ratio;

        if(w && h){
            r = gcd(w, h)
            //ratio = w/r + ':' + h/r;
            setWidth(Math.floor(w/cols))
            setHeight(Math.floor(h/rows))
            ratio = (cols === rows) ? w/r + ':' + h/r : (w/cols) * cols + ':' + (h/rows) * rows;
            setRatio(ratio)
            console.log('grid Width:', width)
            console.log('grid height:', height)
            console.log('ratio:', ratio)
        }

    })

    const { img } = image || {};

    const cardtransformations: ImageTransformations = {
        ...img?.image,
        upscale: true,
        strip: true,
        quality: 80,
        width: (width * cols),
        height: height * rows,
        aspectRatio: ratio,
        scaleMode: 'c',
        scaleFit: !image?.disablePoiAspectRatio
            && img?.image?.poi
            && img?.image?.poi.x != -1
            && img?.image?.poi.y != -1
            ? 'poi'
            : undefined,
    }

    //console.log(transformations);

    const content = <>

        {imageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
        <div className="img-place" style={{ display: `${imageLoading ? "none" : "block"}`, height: '100%' }}>
            <TrueAdaptiveImage
                ref={imageRef}
                onLoad={() => handleImageLoaded()}
                image={img?.image.image}
                transformations={cardtransformations}
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
            <a ref={parentRef} className={`${clsx(classes.tile)} amp-tile amp-tile-${index + 1} ${style || ''}`} href={links[0]?.value}>
                {content}
            </a>
        ) : (
            <div ref={parentRef} className={`${clsx(classes.tile)} amp-tile amp-tile-${index + 1} ${style || ''}`}>
                {content}
            </div>
        )
    )
}

export default withStyles(styles)(CardEnhanced);
