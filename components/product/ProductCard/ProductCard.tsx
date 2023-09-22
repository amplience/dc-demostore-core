import React from 'react';
import { Theme, Typography, Button } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { useCmsContext } from '@lib/cms/CmsContext';
import { Product } from '@amplience/dc-integration-middleware';
import _ from 'lodash'
import { withStyles, WithStyles } from '@mui/styles'
import { getImageURL } from '@utils/getImageURL';

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        border: '1px solid white',
        '&:hover': {
            border: '1px solid black'
        }
    },
    imageContainer: {
        position: 'relative' as 'relative',
        paddingTop: '150%'
    },
    image: {
        position: 'absolute' as 'absolute',
        top: 0,
        bottom: 0,
        // height: '100%',
        width: '100%',
        // objectFit: 'cover' as 'cover'
    },
    details: {
        marginTop: 30,
        marginBottom: 30,
        padding: 5
    },
    name: {
        // fontFamily: "'Roboto Condensed Regular', sans-serif",
        // fontSize: 18,
        // color: '#231f20'
    },
    overview: {
        marginTop: 20,
        // fontSize: 13,
        // color: '#231f20'
    },
    price: {
        // fontSize: 18,
        // color: '#231f20'
    },
    salePrice: {
        color: '#f30000',
        textDecoration: 'line-through'
    },
    button: {
        marginTop: 30
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    data: Product;
}

const stripHtml = /(<([^>]+)>)/gi;

const sentenceEnd = /(\.|\?|\!)/gi;

function limitSentences(text: string, sentences: number, charLength: number) {
    const matches = text.matchAll(sentenceEnd);

    let count = 0;
    for (const match of matches) {
        if (++count === sentences || (match.index ?? 0) >= charLength) {
            return text.substring(0, (match.index ?? 0) + 1);
        }
    }

    return text;
}

function replaceOldImageHosts(image: string) {
    return image.replace("i8.amplience.net", "cdn.media.amplience.net").replace("i1.adis.ws", "cdn.media.amplience.net");
}

const ProductCardSkeleton: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        data,
        ...other
    } = props;

    const {
        variants, 
        name,
        slug,
        shortDescription,
        id
    } = data;

    const variant = variants[0];

    // Smart Imaging from Amplience
    /*
     In here we need to do the following
      - if the domain is i8.amplience.net for images[0].url and images[1].url then we need to change to cdn.media.amplience.net
      - We need to append transformations at the end of this for auto-formatting: 
    */
    let firstImage:string = '';
    let secondImage:string = '';
    if(variant.images){
        if (variant.images[0] && variant.images[0].url){
            
            firstImage = replaceOldImageHosts(variant.images[0].url)
            if(firstImage.indexOf('cdn.media.amplience.net') > 0){
                firstImage = getImageURL(firstImage, {width: 540, height: 810}, true)
            }
        }
        if (variant.images[1] && variant.images[1].url){
            secondImage = replaceOldImageHosts(variant.images[1].url)
            if(secondImage.indexOf('cdn.media.amplience.net') > 0){
                secondImage = getImageURL(firstImage, {width: 540, height: 810}, true)
            }
        }
    }

    const sanitaryDescription = shortDescription == null ? shortDescription : limitSentences(shortDescription.replace(stripHtml, ""), 2, 100);

    return (
        <Link href={`/product/${id}/${slug}`}>
            <a>
                <div className={clsx(classes.root, className)} {...other}>
                    <div className={classes.imageContainer}>
                        { firstImage && secondImage && <img loading="lazy" src={`${firstImage}`} 
                            onMouseOver={e => (e.currentTarget.src = secondImage)}
                            onMouseOut={e => (e.currentTarget.src = firstImage)}
                            className={classes.image} alt={firstImage} /> }
                        { firstImage && !secondImage && <img loading="lazy" src={`${firstImage}`} className={classes.image} alt={firstImage} /> }
                        { secondImage && <div style={{display: 'none'}}><img loading="lazy" src={`${secondImage}`} alt={secondImage} /></div> }
                    </div>
                    <div className={classes.details}>
                        <Typography variant="h4" component="h4" className={classes.name}>
                            {name}
                        </Typography>
                        <Typography variant="body2" component="div" className={classes.overview}>
                            {sanitaryDescription}
                        </Typography>
                        { (!variant.salePrice || variant.listPrice === variant.salePrice || _.isEmpty(variant.salePrice)) &&
                            variant.listPrice
                        }
                        { variant.salePrice && variant.listPrice !== variant.salePrice &&
                            <div>                                
                                <span className={classes.salePrice}>{variant.listPrice}</span> {variant.salePrice}
                            </div>
                        }
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default withStyles(styles)(ProductCardSkeleton);