import React from 'react';
import { Theme } from '@mui/material';
import clsx from 'clsx';
import { CmsImage, ImageScaleMode, ImageTransformations, ImageFormat, ImageScaleFit } from '@utils/getImageURL';
import { Overlay } from '@components/ui';
import { CallToAction } from '..';
import AdaptiveImage, { AdaptiveImageSource } from '../AdaptiveImage';
import { withStyles, WithStyles } from '@mui/styles'

const styles = (theme: Theme) => ({
    root: {
    },
    image: {
        width: '100%'
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    image: {
        img: {
            image: ImageTransformations & {
                image: CmsImage
            }
        }
    },
    bannerText?: string;
    ctaSettings: {
        linkUrl: string;
        buttonText: string;
    },
    textPositioning: {
        textPositionHorizontal: 'left' | 'center' | 'right',
        textPositionVertical: 'top' | 'middle' | 'bottom'
    }
}

const MegaMenuSimpleBanner: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        image,
        ctaSettings,
        bannerText,
        textPositioning,
        ...other
    } = props;

    const {
        img
    } = image || {};

    const transformations: ImageTransformations = {
        ...img.image,
        upscale: false,
        strip: true,
        quality: 80,
        scaleMode: ImageScaleMode.ASPECT_RATIO,
        scaleFit: img.image.poi && img.image.poi.x != -1 && img.image.poi.y != -1 ? ImageScaleFit.POINT_OF_INTEREST : undefined
    };

    return (
        <div className={clsx(classes.root, className)} {...other}>
            <Overlay variant="responsive"
                floatingHorizontalAlignment={'center'}
                floatingVerticalAlignment={'middle'}
                overlay={
                    <CallToAction href={ctaSettings?.linkUrl} variant="contained">
                        {ctaSettings?.buttonText}
                    </CallToAction>
                }
            >
                <AdaptiveImage className={classes.image} image={img.image.image} transformations={transformations}>
                    <AdaptiveImageSource
                        type="image/webp"
                        transformations={{
                            format: ImageFormat.WEBP,
                            width: 768,
                            aspectRatio: '1:1'
                        }} />
                    <AdaptiveImageSource
                        transformations={{
                            width: 768,
                            aspectRatio: '1:1'
                        }} />
                </AdaptiveImage>
            </Overlay>
        </div>
    );
};

export default withStyles(styles)(MegaMenuSimpleBanner);