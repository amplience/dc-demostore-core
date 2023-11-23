import React, { useRef, useState } from 'react';
import { Box, Theme, Typography } from '@mui/material';
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
 * SimpleBannerBynder Props
 */
export interface SimpleBannerBynderProps {
    
    /**
     * Bynder content item
     */
    bynder: {
        additionalInfo: {
            selectedFile: {
                url: string;
            }
        };
        originalUrl: string;
        name: string;
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

const SimpleBannerBynder: React.FC<SimpleBannerBynderProps> = ({
        bynder,
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
                    <img loading="lazy" src={bynder?.additionalInfo?.selectedFile?.url ?? bynder?.originalUrl} onLoad={() => handleImageLoaded()} className={classes.image} alt={bynder?.name}/>
                </Box>
    
            </Overlay>
        </Box>
    );
};

export default SimpleBannerBynder;