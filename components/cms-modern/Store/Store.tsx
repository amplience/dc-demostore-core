import React, { useState } from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import ReactMarkdown from 'markdown-to-jsx';
import Image from '@components/cms-modern/Image';
import { useAppContext }from '@lib/config/AppContext'
import Link from 'next/link';

interface Props {
    keyElements: {
        parking: boolean;
        clickAndCollect: boolean;
        lateOpening: boolean;
    }
    image: any;
    imageAltText: string;
    locationName: string;
    details: string;
}

const Store: React.SFC<Props> = (props) => {
    const {
        details,
        keyElements,
        image,
        imageAltText,
        locationName = ""
    } = props;

    const options = {
        overrides: {
          h1: { component: Typography, props: { variant: 'h1' } },
          h2: { component: Typography, props: { variant: 'h2' } },
          h3: { component: Typography, props: { variant: 'h3' } },
          h4: { component: Typography, props: { variant: 'h4', style: { marginTop: 20, marginBottom: 10 } } },
          h5: { component: Typography, props: { variant: 'h5' } },
          h6: { component: Typography, props: { variant: 'h6' } },
          p: { component: Typography, props: { variant: 'body1', style: { marginBottom: 10 } } },
          a: { component: Link },
          li: { component: ({ ...props }) => (
            <li>
              <Typography variant="body1" component="span" {...props} />
            </li>
          ) }
        }
      };

    return (
        <div>
            <div style={{marginBottom: 30}}>
                <Grid container>
                    <Link href="/store" passHref><Typography style={{marginTop: 20, marginBottom: 20}} variant="h2" component="a">Our Stores</Typography></Link>
                    <Typography style={{marginTop: 20, marginBottom: 20}} variant="h2" component="h2">&nbsp;&gt; {locationName}</Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={6} style={{paddingTop: 30}}>
                        <Image query={{}} image={image} alt={imageAltText ? imageAltText : locationName} imageAltText={imageAltText ? imageAltText : locationName} />
                        <Grid container style={{marginTop: 20}}>
                        {
                            keyElements.parking && 
                                <Grid item xs={4}>
                                    <Paper style={{backgroundColor: "#f6f6f6", padding: 15, paddingBottom: 30, margin: 5}}>
                                        <Typography variant="body2">Parking space</Typography>
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            <img style={{width: "50%", paddingTop: 20}} src="/images/parking.svg" alt="parking" />
                                        </Box>
                                    </Paper>
                                </Grid>
                        }
                        {
                            keyElements.lateOpening &&
                            <Grid item xs={4}>
                                <Paper style={{backgroundColor: "#f6f6f6", padding: 15, paddingBottom: 30, margin: 5}}>
                                    <Typography variant="body2">Late opening</Typography>
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                        <img style={{margin: "auto", width: "50%", paddingTop: 20}} src="/images/late-opening.svg" alt="late opening" />
                                    </Box>
                                </Paper>
                            </Grid>
                        }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{paddingTop: 10, paddingLeft: 30}}>
                        <ReactMarkdown style={{witdh: "70%"}} options={options}>{details}</ReactMarkdown>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Store;