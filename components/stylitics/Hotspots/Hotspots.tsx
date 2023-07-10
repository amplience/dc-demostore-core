import React, { createRef, useEffect } from 'react';
import { Theme } from '@mui/material';
import { useAppContext } from '@lib/config/AppContext';
import _ from 'lodash'
import { withStyles, WithStyles } from '@mui/styles'

const styles = (theme: Theme) => ({
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    account?: string;
    sku?: string;
    api?: any;
    display?: any;
    display_extra?: any;
    navigation?: any;
    text?: any;
    price?: any;
}

const Hotspots: React.FunctionComponent<Props> = (props) => {
    const {
        classes,
        account = 'demo-womens',
        sku = "536693_22",
        api,
        display,
        display_extra,
        navigation,
        text,
        price,
        ...other
    } = props;

    let { cms } = useAppContext()

    const container = createRef<HTMLDivElement>();
    useEffect(() => {
        if (!window || !container.current) {
            return;
        }

        let target = container.current;
        const {StyliticsHotspotsWidget} = window as any;
        
        const config = {
            api: {
                item_number: sku,
                max: api.max,
                min: api.min,
            },
            display: {
                ...display,
                ...display_extra    
            },
            navigation,
            text,
            price
        } 

        const styliticsAccount = account
        const embedID = "amplience-stylitics-widget-container"

        let widgetInstance = new StyliticsHotspotsWidget(styliticsAccount, embedID, config)
        widgetInstance.start();
        
        return () => {
            if (target) {
                target.innerHTML = '';
            }
        };

    }, [container, sku, api, display, display_extra, navigation, text, price, cms]);

    return (
        <div ref={container} className="stylitics">
            <div id="amplience-stylitics-widget-container"></div>
        </div>
    );
};

export default withStyles(styles)(Hotspots);