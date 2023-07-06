import React, { useState, useEffect, createRef } from 'react';
import { Theme, useMediaQuery, useTheme } from '@mui/material';
import clsx from 'clsx';
import { withStyles, WithStyles } from '@mui/styles'

import { useAppContext } from '@lib/config/AppContext';

import { useCmsContext } from '@lib/cms/CmsContext';
import { Section, LegacySlider, LegacySliderSlide } from '@components/ui';

import { useAsync } from '@lib/util';
import _ from 'lodash';
import { nanoid } from 'nanoid';

const styles = (theme: Theme) => ({
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    products?: []
}

const LooksByIds: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        products = [],
        ...other
    } = props;

    const container = createRef<HTMLDivElement>();
    useEffect(() => {
        if (!window || !container.current) {
            return;
        }

        let target = container.current;
        const {StyliticsClassicWidget, StyliticsHotspotWidget, StyliticsMoodboardWidget, StyliticsGalleryWidget, StyliticsMainAndDetailWidget } = window as any;
        
        for (let i = 0; i < products?.length; i++) {
            let widgetInstance = new StyliticsClassicWidget("puma", "amplience-stylitics-widget-container-" + products[i], {
                api: {
                    item_number: products[i],
                    //tags: "red_bull_gallery",
                    // Maximum number of bundles to include in the widget
                    max: 10,
                    // Use this to change the bundle count threshold under which the widget is hidden completely.
                    min: 1, 
                },
                display: {
                    disableMnM: true,
                    imglazyLoadNextScreen: true,
                    hideAnchorItem: false,
                    enableDimensionsUI: true
                },
            });
    
            widgetInstance.start();
        }
        return () => {
            if (target) {
                target.innerHTML = '';
            }
        }
    }, [products, container]);

    return (
        <div ref={container} {...other}>
            { 
                products.map((productID: string) => {
                    return <Section title={"For Product: " + productID} key={productID}>
                        <div id={`amplience-stylitics-widget-container-${productID}`}></div>
                    </Section>
                })
            }

            
        </div>
    );
};

export default withStyles(styles)(LooksByIds);