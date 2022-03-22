import React from 'react';
import { Typography } from '@mui/material';
import { useProduct } from '../WithProduct/WithProduct';

interface Props {
}

const ProductHero: React.FC<Props> = (props) => {
    const {
    } = props;

    const { product, setAttribute, attributes, productVariant } = useProduct() || {};
    if (!product) {
        return <></>;
    }

    return <div className="af-pdp-details-summary" style={{marginBottom: 10}}>
        { productVariant && productVariant.listPrice === productVariant.salePrice &&
            <div className="af-pdp-details-summary__price">{productVariant.listPrice}</div>
        }
        { productVariant && productVariant.listPrice !== productVariant.salePrice &&
            <>
                <span className="af-pdp-details-summary__list_price">{productVariant.listPrice}</span>
                <span className="af-pdp-details-summary__sale_price">{productVariant.salePrice}</span>
            </>
        }
        <Typography component="h3" className="af-pdp-details-summary__name">
            {product && product.name}
        </Typography>
    </div>
};

export default ProductHero;