import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { CallToAction, ContentBlock } from '@components/cms-modern';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import NextHead from 'next/head';
import { CmsImage, getImageURL } from '@utils/getImageURL';

export type BlogSnippetProps = {
    image: CmsContent;
    title: string;
    blogdate: string;
    author: string;
    category: string[];
    description: string;
    cta: any;
    tags: any[];
    keywords: string;
};

const buildCTAUrl = (cta: any) => {
    switch (cta.type) {
        case 'URL':
            return cta.value;
        case 'Category ID':
            return `/category/${cta.value}`;
        case 'Product SKU':
            return `/product/${cta.value}`;
        case 'Page ID':
            return `/${cta.value}`;
        default:
            return '#';
    }
};

const BlogSnippet = ({ image, title, blogdate, author, category, description, cta, keywords }: BlogSnippetProps) => {
    return (
        <>
            <NextHead>
                <title>{title || 'Amplience Retail Storefront Website'}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title || 'Amplience Retail Storefront Website'} />
                <meta property="og:description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta property="og:image" content={getImageURL(image.image as CmsImage)} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@amplience" />
                <meta name="twitter:creator" content="@amplience" />
                <meta name="twitter:title" content={title || 'Amplience Retail Storefront Website'} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={getImageURL(image.image as CmsImage)} />
            </NextHead>
            <div className="amp-dc-banner js_dc_banner">
                <div className="amp-dc-banner-wrapper">
                    <div className="amp-dc-banner-pic-wrap">
                        <ContentBlock content={image} />
                    </div>
                </div>
            </div>

            <div className="amp-dc-snippet-info-wrap">
                {category?.length ? (
                    <Typography variant="body2" component="div" className="amp-dc-snippet-info-wrap__categories">
                        {category.join(', ')}
                    </Typography>
                ) : null}
                {title ? (
                    <Typography variant="h1" component="div">
                        {title}
                    </Typography>
                ) : null}
                <div className="amp-dc-snippet-info-wrap__description">
                    {author ? (
                        <Typography variant="h4" component="div" className="amp-dc-author">
                            {author}
                        </Typography>
                    ) : null}
                    {blogdate ? (
                        <Typography variant="h4" component="div" className="amp-dc-blogdate">
                            {blogdate}
                        </Typography>
                    ) : null}
                </div>

                {description ? (
                    <Typography variant="h2" component="p">
                        {description}
                    </Typography>
                ) : null}

                {cta ? (
                    <CallToAction
                        key={cta?.label}
                        href={buildCTAUrl(cta)}
                        style={{ marginTop: '15px !important', marginRight: '15px !important' }}
                        variant={'contained'}
                    >
                        {cta?.label}
                    </CallToAction>
                ) : null}
            </div>
        </>
    );
};

export default BlogSnippet;
