import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
    className?: string;
}

const LegacySliderSlide = (props: Props) => {
    const { children, className, ...other } = props;
    return (
        <li className={clsx('amp-dc-slider-slide', 'amp-dc-slider-slide-card', 'js_ca_slide', className)} {...other}>
            {children}
        </li>
    );
};

export default LegacySliderSlide;
