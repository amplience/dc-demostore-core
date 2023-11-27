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
import { getImageURL } from '@utils/getImageURL';

type Props = {
    shoppableImage: any;
    scaleToFit: boolean;
    hotspotHide: boolean;
    polygonHide: boolean;
    focalPointHide: boolean;
    di:string
} & CmsContent;

const ShoppableImage: FC<Props> = ({
    shoppableImage,
    //scaleToFit = false,
    hotspotHide = false,
    polygonHide = false,
    focalPointHide = true,
    di = ""
}) => {
    const windowSize = useWindowContext();
    const refContainer = useRef<HTMLInputElement>(null);
    const [loaded, setLoaded] = useState(false);
    const [imageSize, setImageSize] = useState({ w: -1, h: -1 });
    const [canvasSize, setCanvasSize] = useState({ w: -1, h: -1 });
    const [targetWidth, setTargetWidth] = useState(canvasSize.w);
    const [targetHeight, setTargetHeight] = useState(800);
    const [targetAspect, setTargetAspect] = useState(targetWidth / targetHeight);
    const [ratio, setRatio] = useState({ w: 1, h: 1 })

    const gcd = (a: number, b: number): number => {
        return (b == 0) ? a : gcd(b, a % b);
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
            setTargetHeight(imageRef.current.height);
            setTargetWidth(imageRef.current.width);
        }
    }

    useEffect(() => {
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, [loaded])

    useLayoutEffect(() => {
        if (refContainer.current) {
            setCanvasSize({
                w: refContainer.current.offsetWidth,
                h: refContainer.current.offsetHeight,
            });
            setTargetWidth(refContainer.current.offsetWidth);
        }
    }, [refContainer]);

    const imageLoaded = () => {
        setLoaded(true);
        if (imageRef.current) {
            setImageSize({ w: imageRef.current.width, h: imageRef.current.height });
            setTargetHeight(imageRef.current.height);
        }
    };

    const hotspotTitle = (hotspot: ShoppableImageHotspot | ShoppableImagePolygon) => {
        return `Target: ${hotspot.target} | Selector: ${hotspot.selector}`;
    };

    const hotspotLink = (hotspot: ShoppableImageHotspot | ShoppableImagePolygon) => {
        let url = '#';
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

        canvasHeight = widthBounded
            ? (imageSize.h / imageSize.w) * targetWidth
            : targetHeight;
        canvasWidth = widthBounded
            ? targetWidth
            : (imageSize.w / imageSize.h) * targetHeight;

        imageStyle = widthBounded ? { minWidth: "100%" } : { minHeight: "100%" };

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
                cursor: 'pointer'
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
        src = getImageURL(shoppableImage.image, {}, false, di)

        image = (
            <img
                src={src}
                ref={imageRef}
                alt=""
                crossOrigin="anonymous"
                className={clsx("amp-vis-page__image", {
                    "amp-vis-page__image--hide": !loaded,
                })}
                style={{width: "100%", height: "auto"}}
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