import React from 'react';
import { Theme } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import clsx from 'clsx';
import { withStyles, WithStyles } from '@mui/styles'

const styles = (theme: Theme) => {
    return {
        root: {
            position: 'relative' as 'relative',
            paddingBottom: '50%',
    
            ['@media (max-width: 768px)']: {
                paddingBottom: '100%',
            },
            ['@media (min-width: 768px)']: {
                paddingBottom: '66%'
            },
            ['@media (min-width: 1024px)']: {
                paddingBottom: '50%'
            }
        }
    }
};

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties
}

const DefaultAdaptiveImageSkeleton: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        ...other
    } = props;

    return (
        <Skeleton className={clsx(classes.root, className)} {...other} />
    );
};

export default withStyles(styles)(DefaultAdaptiveImageSkeleton);