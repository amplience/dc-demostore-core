import { Tooltip } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { commerceApi } from '@pages/api';
import { Product } from '@amplience/dc-integration-middleware';

type ShoppableProductTooltipProps = {
    children: ReactElement;
    target: string;
};

const isProduct = (product?: Product) => {
    return product && product.name && product.variants[0];
};

export const ShoppableProductTooltip = ({ children, target }: ShoppableProductTooltipProps) => {
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let useResult = true;
        commerceApi.getProduct({ id: target }).then((result) => {
            if (useResult) {
                setProduct(result);
                setLoading(false);
            }
        });
        return () => {
            useResult = false;
        };
    }, [target]);

    const enhancedTooltip = (product?: Product) => {
        if (!isProduct(product)) {
            return <div>Product not found</div>;
        }

        return (
            <div className="shoppable-product-tooltip__container">
                <div className="shoppable-product-tooltip__thumbnail">
                    <img
                        src={`${product?.variants[0]?.images[0]?.url}?w=60&qlt=70`}
                        alt={product?.variants[0]?.images[0]?.url}
                    />
                </div>
                <div className="shoppable-product-tooltip__content">
                    <div className="shoppable-product-tooltip__name">{product?.name}</div>
                    <div>{product?.variants[0]?.listPrice}</div>
                </div>
            </div>
        );
    };

    return (
        <Tooltip title={!loading ? enhancedTooltip(product) : 'Loading...'} followCursor placement="top" arrow>
            <div>{children}</div>
        </Tooltip>
    );
};
