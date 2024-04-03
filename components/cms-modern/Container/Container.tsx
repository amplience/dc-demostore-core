import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import ContentBlock from '../ContentBlock';
import { Box } from '@mui/material';

interface Props {
    contentTypes: CmsContent[];
}

const Container = ({ contentTypes = [] }: Props) => {
    return (
        <Box>
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
