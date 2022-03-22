import React, { FC } from 'react'
import { CmsContent } from '@lib/cms/CmsContent';
import { Box } from '@mui/material';

type Props = {

} & CmsContent;

const ExternalBlock: FC<Props> = ({
    external
}) => {
    return (
        <Box dangerouslySetInnerHTML={{
            __html: external
        }}>
        </Box>
    )
}

export default ExternalBlock;