import React from 'react';
import { useProduct } from '../WithProduct/WithProduct';
import CustomRichText from '@components/cms-modern/CustomRichText';

interface Props {
    variant?: string;
}

export type ProductAttributeVariant = 'text';

const ProductRichText = (props: Props) => {
    const { variant = 'text' } = props;

    const { product } = useProduct() || {};
    if (!product || !product[variant]) {
        return null;
    }

    return <CustomRichText text={product[variant] as any} />;
};

export default ProductRichText;
