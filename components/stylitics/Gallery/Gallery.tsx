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
    api?: any;
    api_extra?: any;
    display?: any;
    display_extra?: any;
    navigation?: any;
    text?: any;
    price?: any;
}

const Gallery: React.FunctionComponent<Props> = (props) => {
    const {
        classes,
        header,
        account = 'demo-womens',
        api,
        api_extra,
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
        const {StyliticsGalleryWidget} = window as any;
        
        const config = {
            api: {
                tags: api_extra.tags,
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

        let widgetInstance = new StyliticsGalleryWidget(styliticsAccount, target, config)
        widgetInstance.start();
        
        return () => {
            if (target) {
                target.innerHTML = '';
            }
        };

    }, [container, api, api_extra, display, display_extra, navigation, text, price, cms]);

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

export default withStyles(styles)(Gallery);