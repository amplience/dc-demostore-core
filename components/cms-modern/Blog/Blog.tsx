import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { ContentBlock } from '@components/cms-modern';
import { WithCMSTheme, useThemes } from '../../core/WithCMSTheme';
import { Box } from '@mui/material';

interface BlogProps {
    snippet: CmsContent;
    contentTypes?: CmsContent[];
    content: CmsContent;
    theme?: CmsContent;
}

const Blog = ({ snippet, content, contentTypes = [], theme }: BlogProps) => {
    const Blog = (
        <Box>
            <Box>
                <ContentBlock content={snippet} />
            </Box>
            <Box
                style={{
                    maxWidth: 1050,
                    margin: 'auto',
                }}
            >
                <ContentBlock content={content} />
                {contentTypes.map((item: any, index: number) => (
                    <Box key={index}>
                        <ContentBlock content={item} />
                    </Box>
                ))}
            </Box>
        </Box>
    );

    const { themes } = useThemes() || {};
    if (themes) {
        return (
            <WithCMSTheme themes={themes} themeOverride={theme}>
                {Blog}
            </WithCMSTheme>
        );
    }
    return Blog;
};

export default Blog;
