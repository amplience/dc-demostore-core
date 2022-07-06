import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CmsContent } from '@lib/cms/CmsContent';
import {
    pointsToSVGPath,
    PolygonForwardRef,
    SVGPath
} from './polygon'
import {
    ShoppableImageHotspot,
    ShoppableImagePoi,
    ShoppableImagePolygon,
} from "./ShoppableImageData";
import { useWindowContext } from '../../core/WithWindowContext/WindowContext';
import clsx from 'clsx';
import { CircularProgress, Tooltip } from '@mui/material';
import Link from 'next/link';

type Props = {
    shoppableImage: any;
    scaleToFit: boolean;
    hotspotHide: boolean;
    polygonHide: boolean;
    focalPointHide: boolean;
} & CmsContent;

const ShoppableImage: FC<Props> = ({
    shoppableImage,
    scaleToFit = false,
    hotspotHide = false,
    polygonHide = false,
    focalPointHide = true
}) => {
    const windowSize = useWindowContext();
    const refContainer = useRef<HTMLInputElement>(null);
    const [loaded, setLoaded] = useState(false);
    const [imageSize, setImageSize] = useState({ w: -1, h: -1 });
    const [canvasSize, setCanvasSize] = useState({ w: -1, h: -1 });
    const [targetWidth, setTargetWidth] = useState(canvasSize.w);
    const [targetHeight, setTargetHeight] = useState(800);
    const [targetAspect, setTargetAspect] = useState(targetWidth / targetHeight);
    const [ratio, setRatio] = useState({w:1, h:1})

    const gcd = (a: number, b: number): number => {
        return (b == 0) ? a : gcd(b, a%b);
    }

    
    const [imageRef, setImageRef] = useState(React.createRef<HTMLImageElement>());
    const canvasRef = React.createRef<HTMLDivElement>();

    const resizeWindow = () => {
        if (refContainer.current) {
            setCanvasSize({
                w: refContainer.current.offsetWidth,
                h: refContainer.current.offsetHeight,
              });
            setTargetWidth(refContainer.current.offsetWidth);
        }

        if (imageRef.current) {
            setTargetHeight(imageRef.current.width / ratio.w);
            setTargetWidth(imageRef.current.width);
            //console.log('ratio:', ratio)
            //console.log('imageSize:', imageSize) 
            console.log('targetHeight:', targetHeight)  
        }
      }

    useEffect(() => {
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, [ratio])

    useLayoutEffect(() => {
        if (refContainer.current) {
            setCanvasSize({
                w: refContainer.current.offsetWidth,
                h: refContainer.current.offsetHeight,
              });
            setTargetWidth(refContainer.current.offsetWidth);
            console.log('tW', targetWidth)
        }
    }, [refContainer]);

    const imageLoaded = () => {
        setLoaded(true);
        if (imageRef.current) {
            setImageSize({ w: imageRef.current.width, h: imageRef.current.height });
            setTargetHeight(imageRef.current.height);

            //if(imageSize.w > -1 && imageSize.h > -1){
                let r = gcd(imageRef.current.width, imageRef.current.height)
                let rati = {w: imageRef.current.width/r, h: imageRef.current.height/r};
                setRatio(rati)
                console.log('ratio:', rati)
            //}
        }
    };

    const hotspotTitle = (hotspot: ShoppableImageHotspot | ShoppableImagePolygon) => {
        return `Target: ${hotspot.target} | Selector: ${hotspot.selector}`;
    };

    const hotspotLink = (hotspot: ShoppableImageHotspot | ShoppableImagePolygon) => {
        let url = '#';
        //console.log('hotspot: ', hotspot);
        switch (hotspot.selector) {
            case '.page':
                url = `/${hotspot.target}`;
                break;
            case '.link':
                url = hotspot.target;
                break;
            case '.product':
                url = `/product/${hotspot.target}`;
                break;
            case '.category':
                url = `/category/${hotspot.target}`;
                break;
            default:
                break;
        }
        return url;
    };

    let polygons: SVGPath[] = [];
    if (shoppableImage && shoppableImage.polygons) {
        polygons = shoppableImage.polygons.map((polygon: any) => pointsToSVGPath(polygon.points));
    }

    let imageStyle: any = {};
    let canvas: JSX.Element | undefined;
    const hiddenHotspots = hotspotHide;
    const hiddenPolygons = polygonHide;
    const hiddenFocalPoint = focalPointHide;

    if (shoppableImage && loaded) {
        const widthBounded = imageSize.w / imageSize.h > targetAspect;

        let canvasHeight: number, canvasWidth: number;

        let offsetTransform = '';

        if (scaleToFit) {
            // Scale image to canvas. Focal point is not used.
            canvasHeight = widthBounded
                ? (imageSize.h / imageSize.w) * targetWidth
                : targetHeight;
            canvasWidth = widthBounded
                ? targetWidth
                : (imageSize.w / imageSize.h) * targetHeight;

            //setCanvasSize({w: canvasWidth, h: canvasHeight})

            imageStyle = widthBounded ? { minWidth: "100%" } : { minHeight: "100%" };
        } else {
            // Fill image to canvas, centering on focal point. If the width is the bounding dimension, let it overflow, and vice versa.
            canvasHeight = widthBounded
                ? targetHeight
                : (imageSize.h / imageSize.w) * targetWidth;
            canvasWidth = widthBounded
                ? (imageSize.w / imageSize.h) * targetHeight
                : targetWidth;

            //setCanvasSize({w: canvasWidth, h: canvasHeight})

            // Determine a position offset based on the focal point, if present.
            if (shoppableImage.poi) {
                const poiX = (shoppableImage.poi.x + shoppableImage.poi.w / 2 - 0.5) * canvasWidth;
                const poiY = (shoppableImage.poi.y + shoppableImage.poi.h / 2 - 0.5) * canvasHeight;

                if (widthBounded) {
                    // Width overflow, center on x.
                    const maxDist = (canvasWidth - targetWidth) / 2;

                    offsetTransform = `translate(${Math.min(maxDist, Math.max(-poiX, -maxDist))}px, 0)`;
                } else {
                    // Height overflow, center on y.
                    const maxDist = (canvasHeight - targetHeight) / 2;

                    offsetTransform = `translate(0, ${Math.min(maxDist, Math.max(-poiY, -maxDist))}px)`;
                }
            }

            imageStyle = widthBounded ? { height: "100%", maxWidth: "none" } : { width: "100%", maxHeight: "none" };
        }

        imageStyle.transform = offsetTransform;

        const size = { x: canvasWidth, y: canvasHeight };

        const scaleSize = (poi: ShoppableImagePoi): any => {
            return {
                transform: `translate(${poi.x * canvasWidth}px, ${poi.y * canvasHeight
                    }px)`,
                width: poi.w * canvasWidth + "px",
                height: poi.h * canvasHeight + "px",
            };
        };

        const scaleHotspot = (hotspot: ShoppableImageHotspot): any => {
            return {
                transform: `translate(${hotspot.points.x * canvasWidth}px, ${hotspot.points.y * canvasHeight
                    }px)`,
                cursor:'pointer'
            };
        };

        canvas = (
            <div
                className="amp-vis-page__interactive"
                style={{
                    width: canvasWidth + "px",
                    height: canvasHeight + "px",
                    transform: offsetTransform
                }}
                ref={canvasRef}
            >
                {shoppableImage && shoppableImage.poi && shoppableImage.poi.x != null && (
                    <div
                        className={clsx("amp-vis-page__focalpoint", {
                            "amp-vis-page__focalpoint--hidden": hiddenFocalPoint,
                        })}
                        style={scaleSize(shoppableImage.poi)}
                    >
                        <div className="amp-vis-page__focalcircle"></div>
                    </div>
                )}

                {shoppableImage &&
                    shoppableImage.polygons &&
                    polygons.map((polygon: any, index: number) => (
                        <Link 
                            key={index}
                            href={hotspotLink(
                                (shoppableImage.polygons as ShoppableImagePolygon[])[index]
                            )}>
                            <Tooltip
                                title={hotspotTitle(
                                    (shoppableImage.polygons as ShoppableImagePolygon[])[index]
                                )}
                                followCursor
                            >
                                <PolygonForwardRef
                                    size={size}
                                    className={clsx("amp-vis-page__polygon", {
                                        "amp-vis-page__polygon--hidden": hiddenPolygons,
                                    })}
                                    polygon={polygon}
                                ></PolygonForwardRef>
                            </Tooltip>
                        </Link>
                    ))}

                {shoppableImage &&
                    shoppableImage.hotspots &&
                    shoppableImage.hotspots.map((hotspot: any, index: number) => (
                        <Link 
                            key={index} 
                            href={hotspotLink(hotspot)}
                        >
                            <Tooltip 
                                title={hotspotTitle(hotspot)} 
                                followCursor
                            >
                                <div
                                    className={clsx("amp-vis-page__hotspot", {
                                        "amp-vis-page__hotspot--hidden": hiddenHotspots,
                                    })}
                                    style={scaleHotspot(hotspot)}
                                >
                                    <svg
                                        viewBox="0 0 20 20"
                                        className={clsx("amp-vis-page__hotspotplus")}
                                    >
                                        <rect x="9.15" y="3.5" width="1.7" height="13"></rect>
                                        <rect y="9.15" x="3.5" width="13" height="1.7"></rect>
                                    </svg>
                                </div>
                            </Tooltip>
                        </Link>
                    ))}
            </div>
        );
    }

    let image: JSX.Element | undefined;
    let src = "invalid";
    if (shoppableImage && shoppableImage.image.id) {
        const imageHost = shoppableImage.image.defaultHost;
        src = `https://${imageHost}/i/${shoppableImage.image.endpoint}/${encodeURIComponent(
            shoppableImage.image.name
        )}`;

        image = (
            <img
                src={src}
                ref={imageRef}
                alt=""
                crossOrigin="anonymous"
                className={clsx("amp-vis-page__image", {
                    "amp-vis-page__image--hide": !loaded,
                })}
                style={imageStyle}
                onLoad={() => {
                    imageLoaded();
                }}
            />
        );
    }

    useEffect(() => {
        setLoaded(false);
    }, [src]);   

    return (
        <div ref={refContainer} className="amp-vis-page" style={{ height: targetHeight }}>
            {image || false}
            {image && !loaded && <CircularProgress />}
            {canvas || false}
        </div>
    );
}

export default ShoppableImage;