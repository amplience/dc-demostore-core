import React from 'react';
import { useProduct } from '../WithProduct/WithProduct';

interface Props {
    variant?: string;
}

export type ProductAttributeVariant = 'name' | 'brand' | 'product_id';

const ProductAttribute: React.FC<Props> = (props) => {
    const {
        variant = 'name'
    } = props;

    const { product, productVariant } = useProduct() || {};
    if (!product) {
        return null;
    }

    return <>{(productVariant as any)[variant] || (product as any)[variant] as string}</>;
};

export default ProductAttribute;