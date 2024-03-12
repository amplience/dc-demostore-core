// Generated with util/create-component.js
import React, { useRef, useState, useEffect } from 'react';
import { Box, Grid, CardContent, Typography, Card as MuiCard, CardActions, Button } from '@mui/material';
import { CmsImage, ImageScaleMode, ImageTransformations, ImageScaleFit } from '@utils/getImageURL';
import DefaultAdaptiveImage from '../AdaptiveImage/DefaultAdaptiveImage';
import { DefaultAdaptiveImageSkeleton } from '../AdaptiveImage';
import { withStyles, WithStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const styles = (theme: Theme) => ({
    root: {},
    image: {
      width: '100%',
      minHeight: '50%'
    },
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

export interface CardProps extends WithStyles<typeof styles> {
    className?: string;

    /**
     * Image content item
     */
    image: {
        img: {
            image: ImageTransformations & {
                image: CmsImage;
            };
        };
        disablePoiAspectRatio: boolean;
        imageAltText: string;
        di: string;
    };

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

const Card: React.FC<CardProps> = ({ image, cardName, description, links, classes }) => {
  const imageRef = useRef<any>();
  const [imageLoading, setImageLoading] = useState(true);
  const handleImageLoaded = () => {
    setImageLoading(false);
  }
  
  useEffect(() => {
    if (imageRef?.current?.complete && imageLoading) {
        setImageLoading(false);
    }
}, [imageRef?.current?.complete, imageLoading]);
  const { img } = image || {};


    const transformations: ImageTransformations = {
        ...img?.image,
        upscale: false,
        strip: true,
        quality: 80,
        scaleMode: !image?.disablePoiAspectRatio ? ImageScaleMode.ASPECT_RATIO : undefined,
        scaleFit:
            !image?.disablePoiAspectRatio && img?.image?.poi && img?.image?.poi.x != -1 && img?.image?.poi.y != -1
                ? ImageScaleFit.POINT_OF_INTEREST
                : undefined,
    };

    return (
        <Grid item xs={12} sm data-testid="Card" className={classes.root}>
            <MuiCard
                className={classes.container}
                style={{
                    boxShadow: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                }}
            >
                <CardContent className={classes.content}>
                  {imageLoading ? <DefaultAdaptiveImageSkeleton/> : null}
                  <Box style={{display: `${imageLoading ? 'none': 'block'}`}}>
                      <DefaultAdaptiveImage
                          ref={imageRef}
                          onLoad={() => handleImageLoaded()}
                          image={img?.image.image}
                          imageAltText={image?.imageAltText}
                          transformations={transformations}
                          diParams={image?.di}
                          className={classes.image}
                      />
                    </Box>
                    {cardName && (
                        <Typography variant="h2" component="h2" style={{ marginTop: 15, marginBottom: 15 }}>
                            {cardName}
                        </Typography>
                    )}
                    {description && <Typography component="p">{description}</Typography>}
                </CardContent>
                <CardActions className={classes.actions}>
                    {links &&
                        links.map((link: any, i: number) => {
                            if (link.label) {
                                return (
                                    <Button className={classes.links} href={link.value} key={i}>
                                        <Typography variant="h4" className={classes.linkText}>
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

export default withStyles(styles)(Card);
