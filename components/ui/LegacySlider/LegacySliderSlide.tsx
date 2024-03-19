import React, { PropsWithChildren } from 'react';
import { Theme } from '@mui/material';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

const styles = (theme: Theme) => ({});

interface Props extends PropsWithChildren {
    classes?: any;
    className?: string;
    style?: React.CSSProperties;
    index: number;
}

const LegacySliderSlide = (props: Props) => {
    const { classes, className, children, index, ...other } = props;
    return (
        <li
            key={nanoid()}
            className={clsx('amp-dc-slider-slide', 'amp-dc-slider-slide-card', 'js_ca_slide', className)}
            {...other}
        >
            {children}
        </li>
    );
};

export default LegacySliderSlide;
