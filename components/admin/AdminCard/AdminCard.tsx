import React, { PropsWithChildren } from 'react';
import { Card } from '@mui/material';

interface Props extends PropsWithChildren {}

const AdminCard = (props: Props) => {
    const { children, ...other } = props;

    return (
        <Card
            sx={{
                borderLeft: '6px solid primary.main',
                mb: 'auto',
                width: '100%',
            }}
            {...other}
        >
            {children}
        </Card>
    );
};

export default AdminCard;
