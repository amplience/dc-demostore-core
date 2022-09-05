import React from 'react';
import { Theme } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles'

import { ButtonBack } from 'pure-react-carousel';
import { NavigatePrevious } from '@components/icons';
import clsx from 'clsx';

const styles = (theme: Theme) => ({
    root: {
        display: 'contents'
    },
    icon: {
        cursor: 'pointer',
        width: 40,
        height: 40,
        fill: '#fff',
        background: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute' as 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)'
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
}

const SliderBackButton: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        ...other
    } = props;

    return (
        <ButtonBack className={clsx(classes.root, className)} {...other}>
            <NavigatePrevious className={classes.icon} />
        </ButtonBack>
    );
};

export default withStyles(styles)(SliderBackButton);