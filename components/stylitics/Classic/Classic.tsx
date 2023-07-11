import React, { createRef, useEffect } from 'react';
import { Theme, Typography } from '@mui/material';
import { useAppContext } from '@lib/config/AppContext';
import { useProduct } from '../../product/WithProduct/WithProduct';
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
    api?: any;
    display?: any;
    display_extra?: any;
    navigation?: any;
    text?: any;
    price?: any;
}

const Classic: React.FunctionComponent<Props> = (props) => {
    const {
        classes,
        header,
        account = 'demo-womens',
        sku = "536693_22",
        api,
        display,
        display_extra,
        navigation,
        text,
        price
    } = props;

    const {
        product
    } = useProduct() || {};

    let { cms } = useAppContext()

    const container = createRef<HTMLDivElement>();
    useEffect(() => {
        if (!window || !container.current) {
            return;
        }

        let target = container.current;
        const {StyliticsClassicWidget} = window as any;
        
        const config = {
            api: {
                item_number: product ? product.id : sku || null,
                max: api?.max || 6,
                min: api?.min || 3
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

        let widgetInstance = new StyliticsClassicWidget(styliticsAccount, target, config)
        widgetInstance.start();
        
        return () => {
            if (target) {
                target.innerHTML = '';
            }
        };

    }, [container, sku, api, display, display_extra, navigation, text, price, cms]);

    return (
        <div>
            {
                header && ( 
                    <Typography variant="h2" component="h2">
                        {header}
                    </Typography>
                )
            }
            <div ref={container} className="stylitics"></div>
        </div>
    );
};

export default withStyles(styles)(Classic);