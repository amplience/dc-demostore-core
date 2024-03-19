import React from 'react';
import { Grid, CardContent, Typography, Card as MuiCard, CardActions, Button } from '@mui/material';
import { CmsContent } from '@lib/cms/CmsContent';
import { ContentBlock } from '@components/cms-modern';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => ({
    root: {},
    container: {
        border: 'none',
    },
    content: {
        padding: 10,
    },
    actions: {
        justifyContent: 'center',
        paddingBottom: 20,
    },
    links: {
        paddingLeft: 20,
        paddingRight: 20,
        color: '#fff',
        backgroundColor: '#000',
        borderRadius: 3,
        '&:hover': {
            backgroundColor: '#000',
        },
    },
    linkText: {
        color: '#fff',
    },
});

export interface CardProps {
    classes?: any;
    className?: string;

    /**
     * Image Content Item
     */
    image?: CmsContent;

    /**
     * Title of the Card
     */
    cardName?: string;

    /**
     * Description
     */
    description?: string;

    /**
     * Call-to-action Links
     */
    links?: any[];
}

const Card = ({ image, cardName, description, links, classes }: CardProps) => {
    return (
        <Grid item xs={12} sm data-testid="Card" className={classes?.root}>
            <MuiCard
                className={classes?.container}
                style={{
                    boxShadow: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                }}
            >
                <CardContent className={classes?.content}>
                    {image && <ContentBlock content={image} />}
                    {cardName && (
                        <Typography variant="h2" component="h2" style={{ marginTop: 15, marginBottom: 15 }}>
                            {cardName}
                        </Typography>
                    )}
                    {description && <Typography component="p">{description}</Typography>}
                </CardContent>
                <CardActions className={classes?.actions}>
                    {links &&
                        links.map((link: any, i: number) => {
                            if (link.label) {
                                return (
                                    <Button className={classes?.links} href={link.value} key={i}>
                                        <Typography variant="h4" className={classes?.linkText}>
                                            {link.label}
                                        </Typography>
                                    </Button>
                                );
                            } else {
                                return null;
                            }
                        })}
                </CardActions>
            </MuiCard>
        </Grid>
    );
};

export default Card;
