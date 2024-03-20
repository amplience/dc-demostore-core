import React from 'react';
import { Theme, Typography } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { useCmsContext } from '@lib/cms/CmsContext';
import { useContentAnalytics } from '@lib/analytics';
import { getImageURL } from '@utils/getImageURL';

const styles = (theme: Theme) => ({
    root: {},
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
        marginBottom: 60,
    },
    name: {
        wordWrap: 'break-word' as 'break-word',
        whiteSpace: 'normal' as 'normal',
    },
    overview: {
        marginTop: 20,
    },
    price: {},
    button: {
        marginTop: 30,
    },
});

interface Props {
    classes?: any;
    className?: string;
    style?: React.CSSProperties;
    data?: any;
}

const CuratedProductGridCard = (props: Props) => {
    const { classes, className, data: result, ...other } = props;

    const { trackEvent } = useContentAnalytics();

    const { variants, name, slug, id } = result;

    const { prices, listPrice, images } = variants[0];

    const handleClickProduct = (event: any) => {
        trackEvent({
            category: 'Product',
            action: 'Click',
            label: slug,
            value: prices.list,
        });
    };

    // Retrieve locale/country code from context
    const { locale: cmsLocale } = useCmsContext() || {};
    let locale = cmsLocale || 'en';
    if (locale.indexOf('-') > 0) {
        locale = locale.split('-')[0];
    }

    let imageUrl = result.overrides?.image
        ? getImageURL(result.overrides.image, { width: 540, height: 810 })
        : getImageURL(result.variants[0].images[0].url, { width: 540, height: 810 });

    return (
        <Link passHref href={`/product/${result.id}/${result.slug}`} onClick={handleClickProduct}>
            <div className={clsx(classes?.root, className)} {...other}>
                <div className={classes?.imageContainer}>
                    {result.variants[0] && <img src={imageUrl} className={classes?.image} alt={result.name} />}
                </div>
                <div className={classes?.details}>
                    <Typography variant="h4" component="h4" className={classes?.name}>
                        {result.name}
                    </Typography>
                    <Typography variant="body1" component="div" className={classes?.overview}>
                        {result.description}
                    </Typography>
                    <Typography variant="body2" component="div" className={classes?.price}>
                        {listPrice}
                    </Typography>
                </div>
            </div>
        </Link>
    );
};

export default CuratedProductGridCard;
