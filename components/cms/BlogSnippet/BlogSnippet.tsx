import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { ContentBlock } from '@components/cms-modern';
import { Typography } from '@mui/material';

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

const BlogSnippet = ({ image, title, blogdate, author, category, description }: BlogSnippetProps) => {
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
            </div>
        </>
    );
};

export default BlogSnippet;
