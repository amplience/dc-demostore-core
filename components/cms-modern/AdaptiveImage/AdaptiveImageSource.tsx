import React, { useContext, useMemo } from 'react';
import { ImageTransformations, getImageURL } from '@utils/getImageURL';
import { AdaptiveImageContext } from './AdaptiveImage';

interface Props {
    media?: string;
    transformations?: ImageTransformations;
    type?: string;
}

const AdaptiveImageSource = (props: Props) => {
    const { transformations, ...other } = props;

    const { image, transformations: rootTransformations, diParams } = useContext(AdaptiveImageContext) || {};

    const params = {
        ...rootTransformations,
        ...transformations,
    };

    if (!image) {
        return null;
    } else {
        const imageUrl = getImageURL(image, params, false, diParams);
        const imageUrl2x = getImageURL(
            image,
            {
                ...params,
                width: params.width ? params.width * 2 : undefined,
                height: params.height ? params.height * 2 : undefined,
            },
            false,
            diParams
        );
        return <source srcSet={`${imageUrl} 1x, ${imageUrl2x} 2x`} src={imageUrl} {...other} />;
    }
};

export default AdaptiveImageSource;
