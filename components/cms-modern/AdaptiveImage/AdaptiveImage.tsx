import React, { createContext, forwardRef } from 'react';
import { CmsImage, ImageTransformations, getImageURL } from '@utils/getImageURL';

export interface AdaptiveImageProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    image: CmsImage;
    transformations?: ImageTransformations;
    imageRef?:any;
    children?: React.ReactElement[];
    imageAltText?: string;
    diParams?:string;
}

type ContextState = {
    image: CmsImage;
    transformations?: ImageTransformations;
    diParams?: string;
    srcset?: {
        [factor: string]: ImageTransformations
    }
}

export const AdaptiveImageContext = createContext<ContextState | null>(null);

const AdaptiveImage: React.SFC<AdaptiveImageProps> = (props) => {
    const {
        image,
        imageAltText = "",
        transformations,
        diParams = "",
        children,
        imageRef,
        ...other
    } = props;

    if (!image) {
        return null;
    }

    const defaultImageUrl = getImageURL(image, transformations, false, diParams);

    return (
        <AdaptiveImageContext.Provider value={{
            image,
            transformations,
            diParams
        }}>
            <picture>
                {children}
                <img alt={imageAltText} ref={imageRef} src={defaultImageUrl} {...other} />
            </picture>
        </AdaptiveImageContext.Provider>
    );
};

const AdaptiveImageRef = forwardRef((props:AdaptiveImageProps, ref) => <AdaptiveImage {...props}  imageRef={ref as React.MutableRefObject<HTMLImageElement>}>{props.children}</AdaptiveImage>);
export default AdaptiveImageRef