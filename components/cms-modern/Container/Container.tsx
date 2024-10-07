import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import ContentBlock from '../ContentBlock';
import { Box } from '@mui/material';

interface ContainerProps {
    contentTypes: CmsContent[];
    fixedContentPallete: CmsContent[];
}

const Container = ({ contentTypes = [], fixedContentPallete = [] }: ContainerProps) => {
    return (
        <Box>
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

export default Container;
