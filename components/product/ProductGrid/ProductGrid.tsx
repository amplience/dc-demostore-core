import React, { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
    className?: string;
}

const ProductGrid = (props: Props) => {
    const { className, children, ...other } = props;

    return (
        <Box
            style={{
                display: 'grid',
                gridRowGap: 1,
                gridColumnGap: 1,
                marginBottom: 40,
            }}
            sx={{
                gridTemplateColumns: { xs: 'repeat(2,calc(50% - 1.00016px))', md: 'repeat(4,calc(25% - 24.00016px))' },
            }}
            className={clsx(className)}
            {...other}
        >
            {children}
        </Box>
    );
};

export default ProductGrid;
