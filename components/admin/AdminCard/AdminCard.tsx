import React, { PropsWithChildren } from 'react';
import { Card } from '@mui/material';

interface AdminCardProps extends PropsWithChildren {}

const AdminCard = (props: AdminCardProps) => {
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
