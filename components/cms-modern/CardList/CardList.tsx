import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { CmsContent } from '@lib/cms/CmsContent';
import Card from '../Card';

interface CardListProps {
    header?: string;
    cards?: CmsContent[];
}

const CardList = ({ header, cards }: CardListProps) => {
    return (
        <Box data-testid="CardList" style={{ marginTop: 30, marginBottom: 30 }}>
            {header && (
                <Typography variant="h2" component="h2">
                    {header}
                </Typography>
            )}
            {cards && (
                <Grid container>
                    {cards.map((card: any) => {
                        return <Card key={Math.random().toString(36).substr(2, 9)} {...card} />;
                    })}
                </Grid>
            )}
        </Box>
    );
};

export default CardList;
