import React from 'react';
import { Grid, CardContent, Typography, Card as MuiCard, CardActions, Button } from '@mui/material';
import { CmsContent } from '@lib/cms/CmsContent';
import { ContentBlock } from '@components/cms-modern';

export interface CardProps {
    classes?: any;
    className?: string;
    image?: CmsContent;
    cardName?: string;
    description?: string;
    links?: any[];
}

const Card = ({ image, cardName, description, links }: CardProps) => {
    return (
        <Grid item xs={12} sm data-testid="Card">
            <MuiCard
                style={{
                    border: 'none',
                    boxShadow: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                }}
            >
                <CardContent
                    style={{
                        padding: 10,
                    }}
                >
                    {image && <ContentBlock content={image} />}
                    {cardName && (
                        <Typography variant="h2" component="h2" style={{ marginTop: 15, marginBottom: 15 }}>
                            {cardName}
                        </Typography>
                    )}
                    {description && <Typography component="p">{description}</Typography>}
                </CardContent>
                <CardActions
                    style={{
                        justifyContent: 'center',
                        paddingBottom: 20,
                    }}
                >
                    {links &&
                        links.map((link: any, i: number) => {
                            if (link.label) {
                                return (
                                    <Button
                                        style={{
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                            color: '#fff',
                                            backgroundColor: '#000',
                                            borderRadius: 3,
                                        }}
                                        href={link.value}
                                        key={i}
                                    >
                                        <Typography
                                            variant="h4"
                                            style={{
                                                color: '#fff',
                                            }}
                                        >
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
