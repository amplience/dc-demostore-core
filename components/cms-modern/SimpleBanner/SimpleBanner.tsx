import React, { useEffect, useRef, useState } from 'react';
import { Box, Theme, Typography } from '@mui/material';
import { CmsImage, ImageScaleMode, ImageTransformations, ImageScaleFit } from '@utils/getImageURL';
import DefaultAdaptiveImage from '../AdaptiveImage/DefaultAdaptiveImage';
import { Overlay, InfoPanel } from '@components/ui';
import { CallToAction } from '..';
import { DefaultAdaptiveImageSkeleton } from '../AdaptiveImage';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
    }, 
    image: {
        width: '100%',
        minHeight: '50%'
    },
    overlay: {
        [theme.breakpoints.down('md')]: {
            position: 'unset !important',
            background: 'red'
        }
    },
    infoPanel: {
    },
    subheader: {
        color: 'inherit',
        fontFamily: "'Roboto', sans-serif",
        fontSize: '14px'
    },
    description: {
        fontWeight: 400,
        fontSize: '16px',
        color: 'inherit',
        marginTop:20,
        marginBottom:20
    },
    cta: {
        marginTop: 15
    }
}));

/**
 * SimpleBanner Props
 */
export interface SimpleBannerProps {
    
    /**
     * Image content item
     */
    image: {
        img: {
            image: ImageTransformations & {
                image: CmsImage
            }
        };
        disablePoiAspectRatio: boolean;
        imageAltText: string;
    },

    /**
     * All banner texts, header, subheader and description
     */
    bannerText: {
        header: string;
        subheader?: string;
        description: string;
    },

    /** 
     * Panel opacity 
     * */
    opacity?: number;

    /**
     * Call-to-action settings, with text and url
     */
    ctaSettings: {
        linkUrl: string;
        buttonText: string;
    },

    /**
     * Text position configuration
     */
    textPositioning: {
        textPositionHorizontal: 'left' | 'center' | 'right',
        textPositionVertical: 'top' | 'middle' | 'bottom'
    }
}

const SimpleBanner: React.FC<SimpleBannerProps> = ({
        image,
        bannerText,
        ctaSettings,
        opacity = 0.9,
        textPositioning = { textPositionHorizontal: 'right', textPositionVertical: 'middle' },
        ...other
    }) => {

    const classes = useStyles();
    const [imageLoading, setImageLoading] = useState(true);
    const imageRef = useRef<any>();

    const handleImageLoaded = () => {
      setImageLoading(false);
    }
    
    useEffect(() => {
      if (imageRef?.current?.complete && imageLoading) {
          setImageLoading(false);
      }
  }, [imageRef?.current?.complete, imageLoading]);

    const {
        img
    } = image || {};

    const transformations: ImageTransformations = {
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
						: undefined
    };

    const isOverlayVisible = bannerText?.header || bannerText?.subheader || bannerText?.description || ctaSettings?.buttonText;

    return (
        <Box className={classes.root} {...other}>
            <Overlay variant="responsive"
                floatingHorizontalAlignment={textPositioning?.textPositionHorizontal}
                floatingVerticalAlignment={textPositioning?.textPositionVertical}
                overlay={
                    isOverlayVisible ? (
                        <InfoPanel className={classes.infoPanel}
                            variant="absolute" opacity={opacity} >
                            <Typography variant="h1" component="h1">{bannerText?.header}</Typography>
                            <Typography variant="h5" component="h5" className={classes.subheader}>{bannerText?.subheader}</Typography>
                            <Typography variant="subtitle1" component="p" className={classes.description}>{bannerText?.description}</Typography>
                            <CallToAction href={ctaSettings?.linkUrl} className={classes.cta} variant="contained">
                                {ctaSettings?.buttonText}
                            </CallToAction>
                        </InfoPanel>
                    ) : null
                }>
                {imageLoading ? <DefaultAdaptiveImageSkeleton/> : null}
                <Box style={{display: `${imageLoading ? 'none': 'block'}`}}>
                    <DefaultAdaptiveImage ref={imageRef} onLoad={() => handleImageLoaded()} image={img?.image.image} imageAltText={image?.imageAltText} transformations={transformations} className={classes.image} />
                </Box>
    
            </Overlay>
        </Box>
    );
};

export default SimpleBanner;