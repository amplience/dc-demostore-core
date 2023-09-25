import React, { createRef, useEffect } from 'react';
import { Theme } from '@mui/material';
import { useAppContext } from '@lib/config/AppContext';
import { useProduct } from '../WithProduct/WithProduct';
import ImageGallery from 'react-image-gallery';
import _ from 'lodash'
import { withStyles, WithStyles } from '@mui/styles'
import { ImageFormat, getImageURL } from '@utils/getImageURL';
import { useAcceleratedMedia } from '@components/admin/AdminPanel/context/AcceleratedMediaContext';

const styles = (theme: Theme) => ({
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    variant?: 'portrait' | 'landscape',
    numItems?: number;
}

const ProductMediaViewer: React.FunctionComponent<Props> = (props) => {
    const {
        classes,
        variant = 'portrait',
        numItems = 2,
        ...other
    } = props;

    const {
        product
    } = useProduct() || {};

    let { cms } = useAppContext()

    const {
        acceleratedMedia
    } = useAcceleratedMedia();

    let format = 'auto'
    if (acceleratedMedia) format = ImageFormat.AVIF

    const container = createRef<HTMLDivElement>();

    let mediaSet: string | null = null

    // Get Image Set ID from image URL
    const mainImageURL = new URL(product.variants[0]?.images[0]?.url)
    if (mainImageURL) {
        const match = mainImageURL.pathname.match(`\/s\/${cms.imageHub}\/(.*)`)      
        if (match) {
            mediaSet = match[1]
        }
    }

    useEffect(() => {
        if (!window || !container.current || !product) {
            return;
        }

        const { amp } = window as any;
        let target = container.current;

        if (cms.imageHub && mediaSet) {
            new amp.Viewer({
                target,
                client: cms.imageHub,
                imageBasePath: `https://cdn.media.amplience.net/`,
                set: mediaSet,
                view: variant,
                secure: true,
                templates: {
                    thumb: `w=85&h=85&unsharp=0,1,1,7&qlt=default&fmt=${format}`,
                    desktop: {
                        main: `w=600&upscale=false&qlt=default&fmt=${format}`,
                        mainRetina: `w=1200&upscale=false&qlt=default&fmt=${format}`,
                    },
                    desktopFull: {
                        main: `w=1000&upscale=false&qlt=default&fmt=${format}`,
                        mainRetina: `w=2000&upscale=false&qlt=default&fmt=${format}`,
                    },
                    mobile: {
                        main: `w=500&h=500&upscale=false&qlt=default&fmt=${format}`,
                        mainRetina: `w=1000&h=1000&upscale=false&qlt=default&fmt=${format}`,
                    },
                },
                ampConfigs: {
                    mainContainerCarousel: {
                        listVisible: Number(numItems),
                    },
                },
            });
        }
        else {
            console.error(`product image hub not found`)
        }

        return () => {
            if (target) {
                target.innerHTML = '';
            }
        };

    }, [container, numItems, variant, cms, product]);

    if (mediaSet) {
        return (
            <div className="af-pdp-viewer">
                <div ref={container} className="af-pdp-viewer__target" id="amp-container">
                </div>
            </div>
        );
    }
    else {
        return (
            <ImageGallery items={_.uniqBy(_.map(_.flatten(_.map(product.variants, 'images')), image => ({
                original: getImageURL(image.url),
                thumbnail: getImageURL(image.thumb || image.url)
            })), 'original')} />
        );
    }
};

export default withStyles(styles)(ProductMediaViewer);