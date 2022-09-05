import React, { PropsWithChildren } from 'react';
import { Theme } from '@mui/material';
import clsx from 'clsx';
import { nanoid } from 'nanoid'
import { withStyles, WithStyles } from '@mui/styles'

const styles = (theme: Theme) => ({
});

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
    className?: string;
    style?: React.CSSProperties;
    index: number;
}

const LegacySliderSlide: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        children,
        index,
        ...other
    } = props;
    return (
        <li key={ nanoid() } className={clsx(
            'amp-dc-slider-slide',
            'amp-dc-slider-slide-card',
            'js_ca_slide',
            className
        )} {...other}>
            {children}
        </li>
    );
};

export default withStyles(styles)(LegacySliderSlide);