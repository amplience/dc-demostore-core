import React from 'react';
import { Theme } from '@mui/material';
import clsx from 'clsx';
import { withStyles, WithStyles } from '@mui/styles'

import Skeleton from 'react-loading-skeleton';

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column' as 'column'
    },
    imageContainer: {
        position: 'relative' as 'relative',
        paddingTop: '150%'
    },
    image: {
        position: 'absolute' as 'absolute',
        top: 0,
        bottom: 0,
        // height: '100%',
        width: '100%',
        // objectFit: 'cover' as 'cover'
    },
    details: {
        marginTop: 30,
        marginBottom: 60
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
}

const ProductCardSkeleton: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        ...other
    } = props;

    return (
        <div className={clsx(classes.root, className)} {...other}>
            <div className={classes.imageContainer}>
                <Skeleton className={classes.image} />
            </div>
            <div className={classes.details}>
                <Skeleton count={3} />
            </div>
        </div>
    );
};

export default withStyles(styles)(ProductCardSkeleton);