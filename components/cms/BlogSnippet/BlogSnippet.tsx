import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { CallToAction, ContentBlock } from '@components/cms-modern';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export type BlogSnippetProps = {
    image: CmsContent;
    title: string;
    blogdate: string;
    author: string;
    category: string[];
    description: string;
    cta: any;
    tags: any[];
    keywords: string[];
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

const BlogSnippet = ({ image, title, blogdate, author, category, description, cta }: BlogSnippetProps) => {
    return (
        <>
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
