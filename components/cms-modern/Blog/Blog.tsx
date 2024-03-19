import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { ContentBlock } from '@components/cms-modern';
import { WithCMSTheme, useThemes } from '../../core/WithCMSTheme';
import { Theme } from '@mui/material';
import { Box } from '@mui/material';

const styles = (theme: Theme) => ({
    root: {},
    content: {
        maxWidth: 1050,
        margin: 'auto',
    },
});

/**
 * Blog props
 */
interface BlogProps {
    classes?: any;

    /**
     * Blog snippet
     */
    snippet: CmsContent;

    /**
     * Array of content
     */
    contentTypes?: CmsContent[];

    /**
     * Content
     */
    content: CmsContent;

    /**
     * Theme
     */
    theme?: CmsContent;
}

const Blog = ({ classes, snippet, content, contentTypes = [], theme }: BlogProps) => {
    const Blog = (
        <Box className={classes?.root}>
            <Box>
                <ContentBlock content={snippet} />
            </Box>
            <Box className={classes?.content}>
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
