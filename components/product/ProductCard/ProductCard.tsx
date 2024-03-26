import React from 'react';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { Product } from '@amplience/dc-integration-middleware';
import _ from 'lodash';
import { getImageURL } from '@utils/getImageURL';

interface Props {
    classes?: any;
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

const ProductCardSkeleton = (props: Props) => {
    const { className, data, ...other } = props;
    const { variants, name, slug, shortDescription, id } = data;
    const variant = variants[0];

    // Smart Imaging from Amplience
    /*
     In here we need to do the following
      - We need to append transformations at the end of this for auto-formatting: 
    */
    let firstImage: string = '';
    let secondImage: string = '';
    if (variant.images) {
        if (variant.images[0] && variant.images[0].url) {
            firstImage = variant.images[0].url;
            if (firstImage.indexOf('cdn.media.amplience.net') > 0) {
                firstImage = getImageURL(firstImage, { width: 540, height: 810 }, true);
            }
        }
        if (variant.images[1] && variant.images[1].url) {
            secondImage = variant.images[1].url;
            if (secondImage.indexOf('cdn.media.amplience.net') > 0) {
                secondImage = getImageURL(firstImage, { width: 540, height: 810 }, true);
            }
        }
    }

    const sanitaryDescription =
        shortDescription == null ? shortDescription : limitSentences(shortDescription.replace(stripHtml, ''), 2, 100);

    return (
        <Link passHref href={`/product/${id}/${slug}`}>
            <Box
                sx={{
                    '&:hover': {
                        border: '1px solid black !important',
                    },
                }}
                style={{ display: 'flex', flexDirection: 'column' as 'column', border: '1px solid white' }}
                className={clsx(className)}
                {...other}
            >
                <Box style={{ position: 'relative' as 'relative', paddingTop: '150%' }}>
                    {firstImage && secondImage && (
                        <img
                            loading="lazy"
                            src={`${firstImage}`}
                            onMouseOver={(e) => (e.currentTarget.src = secondImage)}
                            onMouseOut={(e) => (e.currentTarget.src = firstImage)}
                            style={{ position: 'absolute' as 'absolute', top: 0, bottom: 0, width: '100%' }}
                            alt={firstImage}
                        />
                    )}
                    {firstImage && !secondImage && (
                        <img
                            loading="lazy"
                            src={`${firstImage}`}
                            style={{ position: 'absolute' as 'absolute', top: 0, bottom: 0, width: '100%' }}
                            alt={firstImage}
                        />
                    )}
                    {secondImage && (
                        <div style={{ display: 'none' }}>
                            <img loading="lazy" src={`${secondImage}`} alt={secondImage} />
                        </div>
                    )}
                </Box>
                <div style={{ marginTop: 30, marginBottom: 30, padding: 5 }}>
                    <Typography variant="h4" component="h4">
                        {name}
                    </Typography>
                    <Typography variant="body2" component="div" style={{ marginTop: 20 }}>
                        {sanitaryDescription}
                    </Typography>
                    {(!variant.salePrice || variant.listPrice === variant.salePrice || _.isEmpty(variant.salePrice)) &&
                        variant.listPrice}
                    {variant.salePrice && variant.listPrice !== variant.salePrice && (
                        <div>
                            <span style={{ color: '#f30000', textDecoration: 'line-through' }}>
                                {variant.listPrice}
                            </span>{' '}
                            {variant.salePrice}
                        </div>
                    )}
                </div>
            </Box>
        </Link>
    );
};

export default ProductCardSkeleton;
