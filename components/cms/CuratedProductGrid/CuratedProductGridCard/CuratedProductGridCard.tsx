import React from 'react';
import { Theme, Typography } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { useCmsContext } from '@lib/cms/CmsContext';
import { useContentAnalytics } from '@lib/analytics';
import { withStyles, WithStyles } from '@mui/styles'

const styles = (theme: Theme) => ({
    root: {
    },
    imageContainer: {
        position: 'relative' as 'relative',
    },
    image: {
        top: 0,
        bottom: 0,
        width: '100%',
    },
    details: {
        marginTop: 30,
        marginBottom: 60
    },
    name: {
        wordWrap: 'break-word' as 'break-word',
        whiteSpace: 'normal' as 'normal',
    },
    overview: {
        marginTop: 20,
    },
    price: {
    },
    button: {
        marginTop: 30
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    data?: any;
}

const CuratedProductGridCard: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        data: result,
        ...other
    } = props;

    const {
        trackEvent
    } = useContentAnalytics()

    const {
        variants,
        name,
        slug,
        id
    } = result;

    const {
        prices,
        listPrice,
        images
    } = variants[0];

    const handleClickProduct = (event: any) => {
        trackEvent({
            category: 'Product',
            action: 'Click',
            label: slug,
            value: prices.list
        });
    }

    // Retrieve locale/country code from context
    const { locale: cmsLocale } = useCmsContext() || {}
    let locale = cmsLocale || 'en';
    if (locale.indexOf('-') > 0) {
        locale = locale.split('-')[0];
    }

    let imageUrl = result.overrides?.image
        ? `https://${result.overrides.image?.defaultHost}/i/${result.overrides.image?.endpoint}/${result.overrides.image?.name}`
        : `${result.variants[0].images[0].url}`;
    imageUrl += '?fmt=auto&qlt=default&fmt.jpeg.qlt=75&fmt.webp.qlt=60&fmt.jp2.qlt=40'

    return (
        <Link href={`/product/${result.id}/${result.slug}`}>
            <a onClick={handleClickProduct}>
                <div className={clsx(classes.root, className)} {...other}>
                    <div className={classes.imageContainer}>
                        {result.variants[0] && <img src={imageUrl} className={classes.image} alt={result.slug} />}
                    </div>
                    <div className={classes.details}>
                        <Typography variant="h4" component="h4" className={classes.name}>
                            {result.name}
                        </Typography>
                        <Typography variant="body1" component="div" className={classes.overview}>
                            {result.description}
                        </Typography>
                        <Typography variant="body2" component="div" className={classes.price}>
                            {listPrice}
                        </Typography>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default withStyles(styles)(CuratedProductGridCard);