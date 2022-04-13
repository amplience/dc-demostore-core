import React, { createRef, useEffect } from 'react';
import { Theme } from '@mui/material';
import { useAppContext } from '@lib/config/AppContext';
import { useProduct } from '../WithProduct/WithProduct';
import ImageGallery from 'react-image-gallery';
import _ from 'lodash'
import { withStyles, WithStyles } from '@mui/styles'

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

    const container = createRef<HTMLDivElement>();
    useEffect(() => {
        if (!window || !container.current || !product) {
            return;
        }

        if (product.imageSetId) {
            const { amp } = window as any;
            let target = container.current;
            const mediaSet = product.imageSetId.padStart(6, '0');

            let productImageHub = _.find(cms.hubs, hub => hub.key === 'productImages')
            if (productImageHub) {
                new amp.Viewer({
                    target,
                    client: productImageHub.name,
                    imageBasePath: `https://cdn.media.amplience.net/`,
                    set: mediaSet,
                    view: variant,
                    secure: true,
                    templates: {
                        thumb: 'w=85&h=85&qlt=65&unsharp=0,1,1,7&fmt=auto&qlt=default&fmt.jpeg.qlt=75&fmt.webp.qlt=60&fmt.jp2.qlt=40',
                        desktop: {
                            main: 'w=600&qlt=75&upscale=false&fmt=auto&qlt=default&fmt.jpeg.qlt=75&fmt.webp.qlt=60&fmt.jp2.qlt=40',
                            mainRetina: 'w=1200&qlt=75&upscale=false&fmt=auto&qlt=default&fmt.jpeg.qlt=75&fmt.webp.qlt=60&fmt.jp2.qlt=40',
                        },
                        desktopFull: {
                            main: 'w=1000&upscale=false&fmt=auto&qlt=default&fmt.jpeg.qlt=75&fmt.webp.qlt=60&fmt.jp2.qlt=40',
                            mainRetina: 'w=2000&upscale=false&fmt=auto&qlt=default&fmt.jpeg.qlt=75&fmt.webp.qlt=60&fmt.jp2.qlt=40',
                        },
                        mobile: {
                            main: 'w=500&h=500&upscale=false&fmt=auto&qlt=default&fmt.jpeg.qlt=75&fmt.webp.qlt=60&fmt.jp2.qlt=40',
                            mainRetina: 'w=1000&h=1000&upscale=false&fmt=auto&qlt=default&fmt.jpeg.qlt=75&fmt.webp.qlt=60&fmt.jp2.qlt=40',
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
        }

    }, [container, numItems, variant, cms, product]);

    if (product.imageSetId) {
        return (
            <div className="af-pdp-viewer">
                <div ref={container} className="af-pdp-viewer__target" id="amp-container">
                </div>
            </div>
        );
    }
    else {
        return (
            <ImageGallery items={_.map(_.flatten(_.map(product.variants, 'images')), image => ({
                original: image.url,
                thumbnail: image.thumb || image.url
            }))} />
        );
    }
};

export default withStyles(styles)(ProductMediaViewer);