import React, { SVGProps } from 'react';
import { ShoppableImagePoint } from './ShoppableImageData';

export interface PolygonBounds {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SVGPath {
    bounds: PolygonBounds;
    path: string;
}

export const pointsToSVGPath = (points: ShoppableImagePoint[]): SVGPath => {
    let path = '';

    const bounds = {
        x: Infinity,
        y: Infinity,
        w: -Infinity,
        h: -Infinity,
    };

    for (let point of points) {
        if (point.x < bounds.x) bounds.x = point.x;
        if (point.y < bounds.y) bounds.y = point.y;
        if (point.x > bounds.w) bounds.w = point.x;
        if (point.y > bounds.h) bounds.h = point.y;
    }

    bounds.w -= bounds.x;
    bounds.h -= bounds.y;

    for (let i = 0; i < points.length; i++) {
        const point = points[i];

        const x = point.x - bounds.x;
        const y = point.y - bounds.y;

        if (i === 0) {
            path += `M ${x} ${y}`;
        } else {
            path += ` L ${x} ${y}`;
        }
    }

    path += ' Z';

    return {
        bounds,
        path,
    };
};

export function Polygon({
    polygon,
    className,
    size,
    polyRef,
    svgProps,
}: {
    polygon: SVGPath;
    size: { x: number; y: number };
    className?: string;
    polyRef?: React.ForwardedRef<SVGSVGElement>;
    svgProps?: SVGProps<unknown>;
}) {
    return (
        <svg
            viewBox={`0 0 ${polygon.bounds.w} ${polygon.bounds.h}`}
            className={className}
            preserveAspectRatio="none"
            style={{
                width: polygon.bounds.w * size.x,
                height: polygon.bounds.h * size.y,
                left: polygon.bounds.x * size.x,
                top: polygon.bounds.y * size.y,
                cursor: 'pointer',
                strokeWidth: 1.5 / size.x + 'px',
                strokeDasharray: 5 / size.x + 'px',
            }}
            {...svgProps}
            ref={polyRef}
        >
            <path d={polygon.path}></path>
        </svg>
    );
}

interface PolygonProps {
    polygon: SVGPath;
    size: { x: number; y: number };
    className?: string;
}

export const PolygonForwardRef = React.forwardRef<SVGSVGElement, SVGProps<unknown> & PolygonProps>((props, ref) => {
    return <Polygon {...props} svgProps={props} polyRef={ref} />;
});
