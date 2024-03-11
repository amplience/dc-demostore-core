import React from 'react';
import { useProduct } from '../WithProduct/WithProduct';
import CustomRichText from '@components/cms-modern/CustomRichText';

interface Props {
    variant?: string;
    richTextVariant?: string;
}

export type ProductAttributeVariant = 'name' | 'brand' | 'product_id';

const ProductAttributeOverride: React.FC<Props> = (props) => {
    const {
        variant = 'name',
        richTextVariant = ''
    } = props;

    const { product, productVariant } = useProduct() || {};
    if (!product) {
        return null;
    }
    if (richTextVariant && product[richTextVariant]) {
        return <CustomRichText text={product[richTextVariant] as any} />
    } else {
        return <>{(productVariant as any)[variant] || (product as any)[variant] as string}</>;
    }
};

export default ProductAttributeOverride;