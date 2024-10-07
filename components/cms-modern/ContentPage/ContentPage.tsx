import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import ContentBlock from '../ContentBlock';
import { Box, Typography } from '@mui/material';

interface ContentPageProps {
    contentTypes: CmsContent[];
    contentPallete: CmsContent[];
    fixedContentPallete: CmsContent[];
    seo: any;
}

const ContentPage = ({
    contentTypes = [],
    contentPallete = [],
    fixedContentPallete = [],
    seo = {},
}: ContentPageProps) => {
    return (
        <Box>
            <Typography variant="h1" component="h1">
                {seo.title}
            </Typography>
            <Typography variant="body1" component="p">
                {seo.description}
            </Typography>
            {fixedContentPallete.map((item, index: number) => {
                return (
                    <Box key={index}>
                        <ContentBlock content={item} />
                    </Box>
                );
            })}
            {contentTypes.map((item, index: number) => {
                return (
                    <Box key={index}>
                        <ContentBlock content={item} />
                    </Box>
                );
            })}
        </Box>
    );
};

export default ContentPage;
