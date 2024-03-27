import React from 'react';
import { Typography, Button, Grid, Paper, Box } from '@mui/material';
import Link from 'next/link';
import ReactMarkdown from 'markdown-to-jsx';
import Image from '@components/cms-modern/Image';

interface Props {
    content: any;
}

const options = {
    overrides: {
        p: { component: Typography, props: { variant: 'body1', style: { lineHeight: '1.4em' } } },
    },
};

const StoreCard = (props: Props) => {
    const { content, ...other } = props;
    return (
        <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{
                display: 'flex',
                padding: '1rem',
            }}
            {...other}
        >
            <Paper style={{ backgroundColor: '#fcfcfc', width: '100%', padding: 15 }}>
                <Link passHref href={'/' + content._meta.deliveryKey}>
                    <Box
                        style={{
                            marginTop: 20,
                            marginBottom: 60,
                        }}
                    >
                        <Typography
                            variant="h3"
                            component="h3"
                            style={{
                                wordWrap: 'break-word' as 'break-word',
                                whiteSpace: 'normal' as 'normal',
                                marginBottom: 10,
                            }}
                        >
                            {content.locationName}
                        </Typography>
                        <Typography component="div" variant="body1" style={{ height: 70 }}>
                            <ReactMarkdown options={options}>{content.locationAddress}</ReactMarkdown>
                        </Typography>
                        {content.image && (
                            <Image
                                image={content.image}
                                alt={content.imageAltText ? content.imageAltText : content.locationName}
                                imageAltText={content.imageAltText ? content.imageAltText : content.locationName}
                            />
                        )}
                        <Grid
                            container
                            spacing={1}
                            alignContent={'center'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            style={{ width: '100%' }}
                        >
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{
                                        marginTop: 30,
                                    }}
                                >
                                    more info
                                </Button>
                            </Box>
                        </Grid>
                    </Box>
                </Link>
            </Paper>
        </Grid>
    );
};

export default StoreCard;
