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
        account = 'demo',
        variant = "classic",
        sku = "531850_01",
        min = 3,
        max = 10,
        ...other
    } = props;

    let { cms } = useAppContext()

    const container = createRef<HTMLDivElement>();
    useEffect(() => {
        if (!window || !container.current) {
            return;
        }

        let target = container.current;
        const {StyliticsClassicWidget, StyliticsHotspotsWidget, StyliticsMoodboardWidget, StyliticsGalleryWidget, StyliticsMainAndDetailWidget } = window as any;
        
        const config = {
            api: {
                item_number: sku,
                //tags: "red_bull_gallery",
                max: max,
                min: min,
            },
            display: {
                disableMnM: true,
                imglazyLoadNextScreen: true,
                hideAnchorItem: false,
                enableDimensionsUI: true
            }
        } 

        const styliticsAccount = account
        const embedID = "amplience-stylitics-widget-container"

        let widgetInstance

        const viewSelector = view || variant;
        
        switch( viewSelector ){
            case "classic":
                widgetInstance = new StyliticsClassicWidget(styliticsAccount, embedID, config)
                break;
            case "hotspots":
                widgetInstance = new StyliticsHotspotsWidget(styliticsAccount, embedID, config)
                break;
            case "moodboard":
                widgetInstance = new StyliticsMoodboardWidget(styliticsAccount, embedID, config)
                break;
            case "gallery":
                widgetInstance = new StyliticsGalleryWidget(styliticsAccount, embedID, config)
                break;
            case "mainAndDetail":
                widgetInstance = new StyliticsMainAndDetailWidget(styliticsAccount, embedID, config)
                break;
            default:
                widgetInstance = new StyliticsClassicWidget(styliticsAccount, embedID, config)
                break;
        }

        widgetInstance.start();
        
        return () => {
            if (target) {
                target.innerHTML = '';
            }
        };

        

    }, [container, view, sku, min, max, cms]);

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