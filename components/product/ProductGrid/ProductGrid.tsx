import React, { PropsWithChildren } from 'react';
import { Theme } from '@mui/material';
import clsx from 'clsx';

// TODO: migrate styles
const styles = (theme: Theme) => ({
    root: {
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(2,calc(50% - 1.00016px))',
        },
    },
});

interface Props extends PropsWithChildren {
    className?: string;
}

const ProductGrid = (props: Props) => {
    const { className, children, ...other } = props;

    return (
        <div
            style={{
                display: 'grid',
                gridRowGap: 1,
                gridColumnGap: 1,
                gridTemplateColumns: 'repeat(4,calc(25% - 24.00016px))',
                marginBottom: 40,
            }}
            className={clsx(className)}
            {...other}
        >
            {children}
        </div>
    );
};

export default ProductGrid;
