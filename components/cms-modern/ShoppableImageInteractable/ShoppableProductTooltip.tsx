import { Tooltip } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { commerceApi } from '@pages/api';
import { Product } from '@amplience/dc-integration-middleware';

type ShoppableProductTooltipProps = {
    children: ReactElement;
    title: string;
    target: string;
};

const isProduct = (product: Product) => {
    return product && product.name && product.variants[0];
};

export const ShoppableProductTooltip = ({ children, title, target }: ShoppableProductTooltipProps) => {
    const [tooltip, setTooltip] = useState(title);

    useEffect(() => {
        let useResult = true;
        commerceApi.getProduct({ id: target }).then((product) => {
            if (useResult) {
                const tooltip = isProduct(product)
                    ? `${product?.name} - ${product?.variants[0]?.listPrice}`
                    : 'Product not found';
                setTooltip(tooltip);
            }
        });
        return () => {
            useResult = false;
        };
    }, [target]);
    return (
        <Tooltip title={tooltip} followCursor>
            <div>{children}</div>
        </Tooltip>
    );
};
