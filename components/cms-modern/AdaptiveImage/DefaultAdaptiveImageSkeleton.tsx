import React from 'react';
import { Box } from '@mui/material';
import Skeleton from 'react-loading-skeleton';

interface Props {
    classes?: any;
    className?: string;
    style?: React.CSSProperties;
}

const DefaultAdaptiveImageSkeleton = (props: Props) => {
    const { classes, className, ...other } = props;

    return (
        <Box
            sx={{
                pb: { sm: '100%', md: '66%', lg: '50%' },
            }}
        >
            <Skeleton
                style={{
                    position: 'relative' as 'relative',
                    paddingBottom: '50%',
                }}
                {...other}
            />
        </Box>
    );
};

export default DefaultAdaptiveImageSkeleton;
