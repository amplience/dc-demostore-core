import React from 'react';
import { Theme } from '@mui/material';
import Skeleton from 'react-loading-skeleton';

const styles = (theme: Theme) => {
    return {
        root: {
            ['@media (max-width: 768px)']: {
                paddingBottom: '100%',
            },
            ['@media (min-width: 768px)']: {
                paddingBottom: '66%',
            },
            ['@media (min-width: 1024px)']: {
                paddingBottom: '50%',
            },
        },
    };
};

interface Props {
    classes?: any;
    className?: string;
    style?: React.CSSProperties;
}

const DefaultAdaptiveImageSkeleton = (props: Props) => {
    const { classes, className, ...other } = props;

    // TODO: responsive padding bottom
    return (
        <Skeleton
            style={{
                position: 'relative' as 'relative',
                paddingBottom: '50%',
            }}
            {...other}
        />
    );
};

export default DefaultAdaptiveImageSkeleton;
