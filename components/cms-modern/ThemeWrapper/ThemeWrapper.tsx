import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import ContentBlock from '../ContentBlock';
import { CmsHierarchyNode } from '@lib/cms/fetchHierarchy';
import { WithCMSTheme, useThemes } from '@components/core/WithCMSTheme';
import { Box } from '@mui/material';

interface Props {
    theme: CmsHierarchyNode;
    components: CmsContent[];
}

const ThemeWrapper = ({ theme, components = [] }: Props) => {
    const { themes } = useThemes();

    return (
        <WithCMSTheme themes={themes} themeOverride={theme}>
            <Box>
                {components.map((item, index: number) => {
                    return (
                        <Box key={index}>
                            <ContentBlock content={item} />
                        </Box>
                    );
                })}
            </Box>
        </WithCMSTheme>
    );
};

export default ThemeWrapper;
