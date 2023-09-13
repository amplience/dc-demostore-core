import React, { createRef, useEffect } from 'react';
import { Theme, Typography } from '@mui/material';
import { useProduct } from '../../product/WithProduct/WithProduct';
import _ from 'lodash'
import { withStyles, WithStyles } from '@mui/styles'
import { fromContentItem, createWidget, StyliticsWidget } from '@amplience/dc-integration-stylitics';
import { useRouter } from 'next/router';

const styles = (theme: Theme) => ({
});

/**
 * Generic props
 */
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
    max: number;
}

/**
 * Generic Component that can handle all the different Stylitics views
 * @param props 
 * @returns 
 */
const Generic: React.FunctionComponent<Props> = (props) => {
    const {
        header,
    } = props;

    const {
        product
    } = useProduct() || {};

    const container = createRef<HTMLDivElement>();

    const {
        push
    } = useRouter();

    useEffect(() => {
        if (!window || !container.current) {
            return;
        }

        let target = container.current;
        let active = true;
        let widgetInstance: StyliticsWidget;

        const item = {
            ...props,
            account: product?.categories[0]?.parent?.id || props.account || 'demo-womens',
            sku: product ? product.id : props.sku
        }

        const args = fromContentItem(item as any);

        const handleApply = async (props: any) => {
            await push(`/product/${props.item.remote_id}/${_.kebabCase(props.item.name)}`)
        }

        createWidget(target, args).then((widget: StyliticsWidget) => {
            if (active) {
                widgetInstance = widget;

                // Click override to redirect to Product page
                widget.override("click", "item", function (props: any) {
                    handleApply(props as any)
                })

                widget.start();
            } else {
                widget.destroy();
            }
        })
        
        // Cleanup
        return () => {
            if (widgetInstance) {
                widgetInstance.destroy();
            }

            if (target) {
                target.innerHTML = '';
            }

            active = false;
        };
    }, [container, props, product]);

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

export default withStyles(styles)(Generic);