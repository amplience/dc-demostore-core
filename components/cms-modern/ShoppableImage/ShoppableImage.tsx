import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { pointsToSVGPath, PolygonForwardRef, SVGPath } from './polygon';
import { ShoppableImageHotspot } from './ShoppableImageData';
import clsx from 'clsx';
import { CircularProgress } from '@mui/material';
import { getImageURL } from '@utils/getImageURL';
import ShoppableImageInteractable from '../ShoppableImageInteractable';


type ShoppableImageProps = {
    shoppableImage: any;
    scaleToFit: boolean;
    hotspotHide: boolean;
    polygonHide: boolean;
    di: string;
    tooltips: any[];
} & CmsContent;

const ShoppableImage = ({
    shoppableImage,
    hotspotHide = false,
    polygonHide = false,
    di = '',
    tooltips = [],
}: ShoppableImageProps) => {
    const refContainer = useRef<HTMLInputElement>(null);
    const [loaded, setLoaded] = useState(false);
    const [imageSize, setImageSize] = useState({ w: -1, h: -1 });
    const [canvasSize, setCanvasSize] = useState({ w: -1, h: -1 });
    const [targetWidth, setTargetWidth] = useState(canvasSize.w);
    const [targetHeight, setTargetHeight] = useState(800);
    const [targetAspect] = useState(targetWidth / targetHeight);

    const gcd = (a: number, b: number): number => {
        return b == 0 ? a : gcd(b, a % b);
    };

    const [imageRef] = useState(React.createRef<HTMLImageElement>());
    const canvasRef = React.createRef<HTMLDivElement>();

    useEffect(() => {
        const resizeWindow = () => {
            if (refContainer.current) {
                setCanvasSize({
                    w: refContainer.current.offsetWidth,
                    h: refContainer.current.offsetHeight,
                });
                setTargetWidth(refContainer.current.offsetWidth);
            }

            if (imageRef.current) {
                setTargetHeight(imageRef.current.height);
                setTargetWidth(imageRef.current.width);
            }
        };

        window.addEventListener('resize', resizeWindow);
        return () => window.removeEventListener('resize', resizeWindow);
    }, [loaded, imageRef]);

    useEffect(() => {
        if (refContainer.current) {
            setCanvasSize({
                w: refContainer.current.offsetWidth,
                h: refContainer.current.offsetHeight,
            });
            setTargetWidth(refContainer.current.offsetWidth);
        }
    }, [refContainer]);

    

    const imageLoaded = useCallback(() => {
        setLoaded(true);
        if (imageRef.current) {
            setImageSize({ w: imageRef.current.width, h: imageRef.current.height });
            setTargetHeight(imageRef.current.height);
        }
    }, [imageRef]);

    useEffect(() => {
        if (imageRef.current?.complete) {
            imageLoaded();
        }
       }, [imageLoaded, imageRef]);

    let polygons: SVGPath[] = [];
    if (shoppableImage && shoppableImage.polygons) {
        polygons = shoppableImage.polygons.map((polygon: any) => pointsToSVGPath(polygon.points));
    }

    let imageStyle: any = {};
    let canvas: JSX.Element | undefined;
    const hiddenHotspots = hotspotHide;
    const hiddenPolygons = polygonHide;

    if (shoppableImage && loaded) {
        const widthBounded = imageSize.w / imageSize.h > targetAspect;

        let canvasHeight: number, canvasWidth: number;

        let offsetTransform = '';

        canvasHeight = widthBounded ? (imageSize.h / imageSize.w) * targetWidth : targetHeight;
        canvasWidth = widthBounded ? targetWidth : (imageSize.w / imageSize.h) * targetHeight;

        imageStyle = widthBounded ? { minWidth: '100%' } : { minHeight: '100%' };

        const size = { x: canvasWidth, y: canvasHeight };

        const scaleHotspot = (hotspot: ShoppableImageHotspot): any => {
            return {
                transform: `translate(${hotspot.points.x * canvasWidth}px, ${hotspot.points.y * canvasHeight}px)`,
                cursor: 'pointer',
            };
        };

        canvas = (
            <div
                className="amp-vis-page__interactive"
                style={{
                    width: canvasWidth + 'px',
                    height: canvasHeight + 'px',
                    transform: offsetTransform,
                }}
                ref={canvasRef}
            >
                {shoppableImage &&
                    shoppableImage.polygons &&
                    polygons.map((polygon: any, index: number) => (
                        <ShoppableImageInteractable
                            target={shoppableImage.polygons[index]?.target}
                            selector={shoppableImage.polygons[index]?.selector}
                            tooltips={tooltips}
                            key={index}
                        >
                            <PolygonForwardRef
                                size={size}
                                className={clsx('amp-vis-page__polygon', {
                                    'amp-vis-page__polygon--hidden': hiddenPolygons,
                                })}
                                polygon={polygon}
                            ></PolygonForwardRef>
                        </ShoppableImageInteractable>
                    ))}

                {shoppableImage &&
                    shoppableImage.hotspots &&
                    shoppableImage.hotspots.map((hotspot: any, index: number) => (
                        <ShoppableImageInteractable
                            target={hotspot?.target}
                            selector={hotspot?.selector}
                            tooltips={tooltips}
                            key={index}
                        >
                            <div
                                className={clsx('amp-vis-page__hotspot', {
                                    'amp-vis-page__hotspot--hidden': hiddenHotspots,
                                })}
                                style={scaleHotspot(hotspot)}
                            >
                                <svg viewBox="0 0 20 20" className={clsx('amp-vis-page__hotspotplus')}>
                                    <rect x="9.15" y="3.5" width="1.7" height="13"></rect>
                                    <rect y="9.15" x="3.5" width="13" height="1.7"></rect>
                                </svg>
                            </div>
                        </ShoppableImageInteractable>
                    ))}
            </div>
        );
    }

    let image: JSX.Element | undefined;
    let src = 'invalid';
    if (shoppableImage && shoppableImage.image.id) {
        src = getImageURL(shoppableImage.image, {}, false, di);

        image = (
            <img
                src={src}
                ref={imageRef}
                alt=""
                crossOrigin="anonymous"
                className={clsx('amp-vis-page__image', {
                    'amp-vis-page__image--hide': !loaded,
                })}
                style={{ width: '100%', height: 'auto' }}
                decoding="async"
                onLoad={() => {
                    imageLoaded();
                }}
            />
        );
    }

    return (
        <div ref={refContainer} className="amp-vis-page" style={{ height: targetHeight }}>
            {image || false}
            {image && !loaded && <CircularProgress />}
            {canvas || false}
        </div>
    );
};

export default ShoppableImage;
