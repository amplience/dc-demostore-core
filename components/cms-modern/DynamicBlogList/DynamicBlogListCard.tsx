import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import clsx from 'clsx';
import Image from '@components/cms-modern/Image';
import { CmsContent } from '@lib/cms/CmsContent';
import { useUserContext } from '@lib/user/UserContext';
import Link from 'next/link';

interface DynamicBlogListCardProps {
    data: {
        snippet: {
            title: string;
            blogdate: string;
            description: string;
            image: {
                image: any;
                imageAltText: string;
            };
            category: string[];
        };
    } & CmsContent;
}

const DynamicBlogListCard = (props: DynamicBlogListCardProps) => {
    const { language } = useUserContext();
    const { data } = props;
    const { _meta, snippet } = data;
    const { title, blogdate, description, image, category = [] } = snippet;

    return (
        <div className={clsx('amp-dc-blog-card', 'amp-dc-snippet', 'js_dc_snippet')}>
            <Link passHref href={`/blog/${_meta?.deliveryKey}`}>
                {image ? (
                    <div className="amp-dc-image">
                        <Image
                            alt={image.imageAltText ? image.imageAltText : title}
                            {...(image as any)}
                            query="w=500&sm=aspect&aspect=16:9"
                        />
                    </div>
                ) : null}

                <div className="amp-dc-category-container">
                    {category.map((item: any, index: number) => {
                        return (
                            <div key={index}>
                                <div className="amp-dc-category">{item}</div>
                                <span className="line"></span>
                            </div>
                        );
                    })}
                </div>
                <div className="amp-dc-blog-card-text-wrap">
                    {title && (
                        <Box component="div" whiteSpace="normal">
                            <Typography variant="h2" component="h2" sx={{maxLines: 2, textOverflow: 'ellipsis', overflow: 'hidden', display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical"}}>
                                {title}
                            </Typography>
                        </Box>
                    )}
                    {blogdate && (
                        <Typography variant="body2" component="p" style={{ paddingTop: 15 }}>
                            {blogdate}
                        </Typography>
                    )}
                    {description && (
                        <Box component="div" whiteSpace="normal" style={{ paddingTop: 15 }}>
                            <Typography variant="body1" component="p" sx={{maxLines: 3, textOverflow: 'ellipsis', overflow: 'hidden', display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical"}}>
                                {description}
                            </Typography>
                        </Box>
                    )}
                    <Button
                        color="primary"
                        variant="contained"
                        style={{
                            fontFamily: '"Roboto Condensed",sans-serif !important',
                            border: '0 !important',
                            fontWeight: '400 !important',
                            borderRadius: '3px !important',
                            padding: '5px 30px !important',
                            marginTop: 30,
                            textAlign: 'center',
                            textTransform: 'uppercase',
                        }}
                    >
                        {language === 'de' ? 'WEITERLESEN' : 'READ MORE'}
                    </Button>
                </div>
            </Link>
        </div>
    );
};

export default DynamicBlogListCard;
