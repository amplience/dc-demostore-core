import React, { FC } from 'react'
import { CmsContent } from '@lib/cms/CmsContent';
import ContentBlock from '../ContentBlock';
import { nanoid } from 'nanoid';
import { Box } from '@mui/material';

interface Props {
    contentTypes: CmsContent[];
}

const Container: FC<Props> = ({contentTypes = []}) => {
    return <Box>
        {
            contentTypes.map(item => {
                return <Box key={ nanoid() }>
                    <ContentBlock content={item} />
                </Box>;
            })
        }
    </Box>;
}

export default Container;