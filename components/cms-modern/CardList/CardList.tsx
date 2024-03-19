import React from 'react';
import { Grid, CardContent, Typography, Card as MuiCard, CardActions, Button, Box } from '@mui/material';
import { CmsContent } from '@lib/cms/CmsContent';
import { Theme } from '@mui/material';
import Card from '../Card';

const styles = (theme: Theme) => ({
    root: { marginTop: 30, marginBottom: 30 },
});

interface CardListProps {
    classes?: any;
    className?: string;

    /**
     * Card List Header
     */
    header?: string;

    /**
     * List of Cards
     */
    cards?: CmsContent[];
}

const CardList = ({ header, cards, classes }: CardListProps) => {
    return (
        <Box data-testid="CardList" className={classes?.root}>
            {header && (
                <Typography variant="h2" component="h2">
                    {header}
                </Typography>
            )}
            {cards && (
                <Grid container>
                    {cards.map((card: any, index: number) => {
                        return <Card key={Math.random().toString(36).substr(2, 9)} {...card} />;
                    })}
                </Grid>
            )}
        </Box>
    );
};

export default CardList;
