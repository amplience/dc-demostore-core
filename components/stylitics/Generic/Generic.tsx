import React, { createRef, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useProduct } from '../../product/WithProduct/WithProduct';
import kebabCase from 'lodash/kebabCase';
import { fromContentItem, createWidget, StyliticsWidget } from '@amplience/dc-integration-stylitics';
import { useRouter } from 'next/router';
import { useECommerce } from '@components/core/Masthead/ECommerceContext';

type Props = {
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
    view?: string;
    variant?: string;
    min: number;
    max: number;
};

/**
 * Generic Component that can handle all the different Stylitics views
 * @param props
 * @returns
 */
const Generic = (props: Props) => {
    const { header } = props;
    const { product } = useProduct() || {};
    const container = createRef<HTMLDivElement>();
    const { push } = useRouter();
    const vendor = useECommerce()?.vendor;

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
            sku: product ? product.id : props.sku,
        };

        const args = fromContentItem(item as any);

        const handleApply = async (props: any) => {
            await push(`/product/${props.item.remote_id}/${kebabCase(props.item.name)}`);
        };

        createWidget(target, args).then((widget: StyliticsWidget) => {
            if (active) {
                widgetInstance = widget;

                const isRest = vendor === 'rest';

                if (isRest && active) {
                    // Click override to redirect to Product page
                    widget.override('click', 'item', function (props: any) {
                        handleApply(props as any);
                    });
                }

                widget.start();
            } else {
                widget.destroy();
            }
        });

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
    }, [container, props, product, push, vendor]);

    return (
        <div>
            {header && (
                <Typography variant="h2" component="h2">
                    {header}
                </Typography>
            )}
            <div ref={container} className="stylitics"></div>
        </div>
    );
};

export default Generic;
