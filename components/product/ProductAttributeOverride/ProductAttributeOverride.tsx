import React from 'react';
import { useProduct } from '../WithProduct/WithProduct';
import CustomRichText from '@components/cms-modern/CustomRichText';
import _ from 'lodash'

interface Props {
    variant?: string;
    richTextVariant?: string;
}

export type ProductAttributeVariant = 'name' | 'brand' | 'product_id';

const hasRichTextData = (richText: any[]) => {
    return richText.some((item: any) => !_.isEmpty(item.data))
}

const ProductAttributeOverride: React.FC<Props> = (props) => {
    const {
        variant = 'name',
        richTextVariant = ''
    } = props;

    const { product, productVariant } = useProduct() || {};
    if (!product) {
        return null;
    }
    if (richTextVariant && product[richTextVariant] && hasRichTextData(product[richTextVariant])) {
        return <CustomRichText text={product[richTextVariant] as any} />
    } else {
        return <>{(productVariant as any)[variant] || (product as any)[variant] as string}</>;
    }
};

export default ProductAttributeOverride;