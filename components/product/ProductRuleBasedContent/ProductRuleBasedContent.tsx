import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography, withStyles, WithStyles } from '@material-ui/core';
import { useProduct } from '../WithProduct/WithProduct';
import { RuleBasedContent } from '@components/cms-modern';

interface Props {
}

const ProductRuleBasedContent: React.FC<Props> = (props) => {
    const {
    } = props;

    const { product } = useProduct() || {};
    if (!product) {
        return <></>;
    }

    let productCategories = null;
    if (product && product.categories) {
        productCategories = (product.categories.map((x: any) => x.id) as any);
    }

    return <RuleBasedContent
        variant="single"
        rules={{
            products: [product.id, "unset"],
            productCategories: productCategories,
            pageTypes: ["Product"]
        }}
        limit={3}
    />
};

export default ProductRuleBasedContent;