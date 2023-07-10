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
    account?: string;
    header?: string;
    sku?: string;
    api?: any;
    display?: any;
    display_extra?: any;
    navigation?: any;
    text?: any;
    price?: any;
}

const MainAndDetail: React.FunctionComponent<Props> = (props) => {
    const {
        classes,
        account = 'demo-womens',
        sku = "536693_22",
        header,
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
        const {StyliticsMainAndDetailWidget} = window as any;
        
        const config = {
            api: {
                item_number: sku,
                max: api?.max || 6,
                min: api?.min || 3,
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

        let widgetInstance = new StyliticsMainAndDetailWidget(styliticsAccount, embedID, config)
        widgetInstance.start();
        
        return () => {
            if (target) {
                target.innerHTML = '';
            }
        };

    }, [container, sku, api, display, display_extra, navigation, text, price, cms]);

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

export default withStyles(styles)(MainAndDetail);