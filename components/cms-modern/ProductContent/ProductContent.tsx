import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import ReactMarkdown from 'markdown-to-jsx';
import { ContentBlock } from '@components/cms-modern';
import { Box, Link, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { getImageURL } from '@utils/getImageURL';

type TextProps = {} & CmsContent;

const Text = ({ header, text = [], align = 'left' }: TextProps) => {
    const options = {
        overrides: {
            h1: { component: Typography, props: { variant: 'h1' } },
            h2: { component: Typography, props: { variant: 'h2' } },
            h3: { component: Typography, props: { variant: 'h3' } },
            h4: { component: Typography, props: { variant: 'h4' } },
            h5: { component: Typography, props: { variant: 'h5' } },
            h6: { component: Typography, props: { variant: 'h6' } },
            p: { component: Typography, props: { variant: 'body1', gutterBottom: true } },
            a: { component: Link },
            li: {
                component: ({ ...props }) => (
                    <li>
                        <Typography variant="body1" component="span" {...props} />
                    </li>
                ),
            },
        },
    };

    return (
        <>
            {header && (
                <Typography variant="h2" component="h2">
                    {header}
                </Typography>
            )}
            ,
            {text.map((item: any) => {
                const { type, data } = item;

                switch (type) {
                    case 'markdown':
                        return (
                            <Box key={nanoid()} className="amp-dc-text" style={{ textAlign: align }}>
                                {data && <ReactMarkdown options={options}>{data}</ReactMarkdown>}
                            </Box>
                        );
                    case 'dc-content-link':
                        return data && <ContentBlock key={nanoid()} content={data} />;
                    case 'dc-image-link':
                        return (
                            data && (
                                <picture key={data.name} className="amp-dc-image">
                                    <img
                                        src={getImageURL(data, { upscale: false, strip: true })}
                                        className="amp-dc-image-pic"
                                        alt={data.name}
                                    />
                                </picture>
                            )
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
};

export default Text;
