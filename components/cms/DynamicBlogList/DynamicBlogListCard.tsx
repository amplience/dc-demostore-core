import React from 'react';
import { Theme, Button, Typography, Box } from '@mui/material';
import clsx from 'clsx';
import Image from '@components/cms-modern/Image';
import { CmsContent } from '@lib/cms/CmsContent';
import { useUserContext } from '@lib/user/UserContext';
import { nanoid } from 'nanoid';
import Link from 'next/link';

const styles = (theme: Theme) => ({
    button: {
        fontFamily: '"Roboto Condensed",sans-serif !important',
        border: '0 !important',
        fontWeight: '400 !important',
        borderRadius: '3px !important',
        padding: '5px 30px !important',
        marginTop: 30,
    },
});

interface Props {
    classes?: any;
    className?: string;
    style?: React.CSSProperties;
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

const DynamicBlogListCard = (props: Props) => {
    const { language } = useUserContext();

    const { classes, data, className, ...other } = props;

    const { _meta, snippet } = data;

    const { title, blogdate, description, image, category = [] } = snippet;

    return (
        <div className={clsx('amp-dc-blog-card', 'amp-dc-snippet', 'js_dc_snippet', className)}>
            <Link passHref href={`/blog/${_meta?.deliveryKey}`}>
                {image ? (
                    <div className="amp-dc-image">
                        <Image
                            alt={image.imageAltText ? image.imageAltText : title}
                            {...(image as any)}
                            query="w=500"
                        />
                    </div>
                ) : null}

                <div className="amp-dc-category-container">
                    {category.map((item: any) => {
                        return (
                            <div key={nanoid()}>
                                <div className="amp-dc-category">{item}</div>
                                <span className="line"></span>
                            </div>
                        );
                    })}
                </div>
                <div className="amp-dc-blog-card-text-wrap">
                    {title && (
                        <Box component="div" whiteSpace="normal">
                            <Typography variant="h2" component="h2">
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
                            <Typography variant="body1" component="p">
                                {description}
                            </Typography>
                        </Box>
                    )}
                    <Button
                        color="primary"
                        variant="contained"
                        className={classes?.button}
                        style={{ textAlign: 'center', textTransform: 'uppercase' }}
                    >
                        {language === 'de' ? 'WEITERLESEN' : 'READ MORE'}
                    </Button>
                </div>
            </Link>
        </div>
    );
};

export default DynamicBlogListCard;
