import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { Box } from '@mui/material';

type Props = {} & CmsContent;

const ExternalBlock = ({ external }: Props) => {
    return (
        <Box
            dangerouslySetInnerHTML={{
                __html: external,
            }}
        ></Box>
    );
};

export default ExternalBlock;
