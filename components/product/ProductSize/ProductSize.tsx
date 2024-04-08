import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useProduct } from '../WithProduct/WithProduct';
import first from 'lodash/first';

const ProductSize = () => {
    const { product, setAttribute, attributes, productVariant } = useProduct() || {};
    if (!product) {
        return <></>;
    }
    if (!productVariant.size) {
        return <></>;
    }

    const sizes = product && product.variants ? [...new Set(product.variants.map((x: any) => x.size))] : [];

    return (
        <div style={{ marginTop: 10 }}>
            <FormControl variant="standard">
                <InputLabel id="demo-simple-select-outlined-label">Size</InputLabel>
                <Select
                    labelId="product_size_select_label"
                    id="product_size_select"
                    defaultValue={first(sizes)}
                    value={attributes?.size}
                    onChange={(event) => setAttribute && setAttribute('size', event.target.value)}
                >
                    {sizes.map((size: any, index: number) => (
                        <MenuItem key={index} value={size}>
                            {size}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default ProductSize;
