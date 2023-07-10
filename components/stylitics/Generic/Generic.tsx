import React, { createRef, useEffect } from 'react';
import { Theme, Typography } from '@mui/material';
import { useAppContext } from '@lib/config/AppContext';
import _ from 'lodash'
import { withStyles, WithStyles } from '@mui/styles'

const styles = (theme: Theme) => ({
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    header?: string;
    gallery?: any;
    moodboard?: any;
    mainAndDetail?: any;
    hotspots?: any;
    classic?: any;
    api?: any;
    display?: any;
    price?: any;
    account?: string;
    sku?: string;
    view?:string;
    variant?:string;
    min: number;
    max: number;}

const Generic: React.FunctionComponent<Props> = (props) => {
    const {
        classes,
        header,
        view,
        api,
        display,
        price,
        gallery,
        moodboard,
        mainAndDetail,
        hotspots,
        classic,
        account = 'demo',
        variant = "classic",
        sku
    } = props;

    let { cms } = useAppContext()

    const container = createRef<HTMLDivElement>();
    useEffect(() => {
        if (!window || !container.current) {
            return;
        }

        let target = container.current;
        const {StyliticsClassicWidget, StyliticsHotspotsWidget, StyliticsMoodboardWidget, StyliticsGalleryWidget, StyliticsMainAndDetailWidget } = window as any;
        
        const config: any = {
            api: {
                item_number: sku || null,
                max: api?.max || 6,
                min: api?.min || 3
            },
            display,
            price
        } 

        const styliticsAccount = account
        const embedID = "amplience-stylitics-widget-container"

        let widgetInstance

        const viewSelector = view || variant;
        
        switch( viewSelector ){
            case "classic":
                config.display = { ...config.display, ...classic.display }
                config.navigation = classic.navigation
                config.text = classic.text
                widgetInstance = new StyliticsClassicWidget(styliticsAccount, embedID, config)
                break;
            case "hotspots":
                config.display = { ...config.display, ...hotspots.display }
                config.text = hotspots.text
                config.display.hotspotsOverlayOrder = config.display.hotspotsOverlayOrder && config.display.hotspotsOverlayOrder.map((item: string) => {
                    return item.split(',')
                })
                widgetInstance = new StyliticsHotspotsWidget(styliticsAccount, embedID, config)
                break;
            case "moodboard":
                config.display = { ...config.display, ...moodboard.display }
                config.navigation = moodboard.navigation
                config.text = moodboard.text
                widgetInstance = new StyliticsMoodboardWidget(styliticsAccount, embedID, config)
                break;
            case "gallery":
                config.api = { ...config.api, ...gallery.api }
                config.display = { ...config.display, ...gallery.display }
                config.navigation = gallery.navigation
                config.text = gallery.text
                widgetInstance = new StyliticsGalleryWidget(styliticsAccount, embedID, config)
                break;
            case "mainAndDetail":
                config.display = { ...config.display, ...mainAndDetail.display }
                widgetInstance = new StyliticsMainAndDetailWidget(styliticsAccount, embedID, config)
                break;
            default:
                config.display = { ...config.display, ...classic.display }
                config.navigation = classic.navigation
                config.text = classic.text
                widgetInstance = new StyliticsClassicWidget(styliticsAccount, embedID, config)
                break;
        }

        widgetInstance.start();
        
        return () => {
            if (target) {
                target.innerHTML = '';
            }
        };
    }, [container, view, sku, api, display, price, classic, moodboard, gallery, hotspots, mainAndDetail, cms]);

    return (
        <div ref={container} className="stylitics">
            {
                header && ( 
                    <Typography variant="h2" component="h2">
                        {header}
                    </Typography>
                )
            }
            <div id="amplience-stylitics-widget-container"></div>
        </div>
    );
};

export default withStyles(styles)(Generic);