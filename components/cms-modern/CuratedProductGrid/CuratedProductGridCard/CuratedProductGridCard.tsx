import React from 'react';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { useCmsContext } from '@lib/cms/CmsContext';
import { useContentAnalytics } from '@lib/analytics';
import { getImageURL } from '@utils/getImageURL';

interface CuratedProductGridCardProps {
    data?: any;
}

const CuratedProductGridCard = (props: CuratedProductGridCardProps) => {
    const { data: result, ...other } = props;
    const { trackEvent } = useContentAnalytics();
    const { variants, slug } = result;
    const { prices, listPrice } = variants[0];
    const handleClickProduct = (event: any) => {
        trackEvent({
            category: 'Product',
            action: 'Click',
            label: slug,
            value: prices?.list,
        });
    };
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
            <div
                {...other}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    height: '100%',
                }}
            >
                {result.variants[0] && (
                    <img
                        src={imageUrl}
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            flexGrow: '1',
                            overflow: 'auto',
                        }}
                        alt={result.name}
                    />
                )}
                <div style={{ flexShrink: '0', overflow: 'auto', marginTop: 30, marginBottom: 60 }}>
                    <Typography
                        variant="h4"
                        component="h4"
                        style={{
                            wordWrap: 'break-word' as 'break-word',
                            whiteSpace: 'normal' as 'normal',
                        }}
                    >
                        {result.name}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="div"
                        style={{
                            marginTop: 20,
                        }}
                    >
                        {result.description}
                    </Typography>
                    <Typography variant="body2" component="div">
                        {listPrice}
                    </Typography>
                </div>
            </div>
        </Link>
    );
};

export default CuratedProductGridCard;
