import React from 'react';
import { DefaultAdaptiveImageSkeleton } from '../AdaptiveImage';

const SkeletonMapping: any = {
    'https://amprsa.net/content/simple-banner': DefaultAdaptiveImageSkeleton,
    'https://amprsa.net/content/simple-localized-banner': DefaultAdaptiveImageSkeleton
};

interface Props {
    className?: string;
    style?: React.CSSProperties;
    schema: string;
}

const ContentBlockSkeleton: React.SFC<Props> = (props) => {
    const {
        schema,
        ...other
    } = props;

    const Component = SkeletonMapping[schema];

    return (
        Component ? <Component {...other} /> : null
    );
};

export default ContentBlockSkeleton;