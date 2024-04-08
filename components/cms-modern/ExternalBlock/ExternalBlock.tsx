import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { Box } from '@mui/material';

type ExternalBlockProps = {} & CmsContent;

const ExternalBlock = ({ external }: ExternalBlockProps) => {
    return (
        <Box
            dangerouslySetInnerHTML={{
                __html: external,
            }}
        ></Box>
    );
};

export default ExternalBlock;
