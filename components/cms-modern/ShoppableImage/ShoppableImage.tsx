import React, { FC } from 'react'
import { CmsContent } from '@lib/cms/CmsContent';
import { Box } from '@mui/material';
import ContentBlock from '../ContentBlock';
import Image from '../Image';

type Props = {
    shoppableImage: any;
} & CmsContent;

const ShoppableImage: FC<Props> = ({
    shoppableImage
}) => {

    if (!shoppableImage.image) {
        return null;
    }

    return <Box style={{position: 'relative', width: 'auto'}}>
        <Image image={shoppableImage.image} />
    </Box>
}

export default ShoppableImage;