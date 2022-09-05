import React, { FC } from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { ContentBlock } from '@components/cms-modern';
import { Typography } from '@mui/material';

/**
 * BlogSnippet props
 */
export type BlogSnippetProps = {

    /**
     * Image
     */
    image: CmsContent;

    /**
     * Blog title
     */
    title: string;

    /**
     * Blog date
     */
    blogdate: string;

    /**
     * Blog author
     */
    author: string;
    
    /**
     * Blog category
     */
    category: string[];

    /**
     * Blog description
     */
    description: string;

    /**
     * Call-to-action configuration
     */
    cta: any;

    /**
     * Tags from taxonomy hierarchy
     */
    tags: any[];

    /**
     * Keywords
     */
    keywords: string[];
};

const BlogSnippet: FC<BlogSnippetProps> = ({
    image,
    title,
    blogdate,
    author,
    category,
    description,
    tags,
    cta,
    keywords
}) => {
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
                    <Typography
                        variant="body2"
                        component="div"
                        className="amp-dc-snippet-info-wrap__categories"
                    >
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
                        <Typography
                            variant="h4"
                            component="div"
                            className="amp-dc-author"
                        >
                            {author}
                        </Typography>
                    ) : null}
                    {blogdate ? (
                        <Typography
                            variant="h4"
                            component="div"
                            className="amp-dc-blogdate"
                        >
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
