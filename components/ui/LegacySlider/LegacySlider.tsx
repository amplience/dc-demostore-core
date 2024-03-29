import React, { useEffect, createRef, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { NavigatePrevious, NavigateNext } from '@components/icons';

interface Props extends PropsWithChildren {
    navigationDots?: boolean;
    infinite?: number;
    autoplay?: boolean;
}

const LegacySlider = (props: Props) => {
    const { children, navigationDots = false, infinite = 0, autoplay = false, ...other } = props;
    let numChildren = React.Children.count(children);
    const component = createRef<any>();

    useEffect(() => {
        const { loryHelpers } = (window as any) || {};
        const element = component.current;
        try {
            if (element && loryHelpers && numChildren > 0) {
                loryHelpers.initSliders([element]);
            }
        } catch (err) {}

        return () => {
            if (element && element.__sliderInstance) {
                try {
                    element.__sliderInstance.destroy();
                } catch (err) {}
            }
        };
    }, [numChildren, component]);

    if (numChildren === 0) {
        // This component is unstable with no slides
        return null;
    }

    return (
        <div
            ref={component}
            className={clsx('amp-dc-slider', 'amp-dc-card-list-slider')}
            data-infinite="true"
            data-autoplay="true"
            data-navigation="false"
            data-sliderlength="3"
        >
            <div
                className={clsx('amp-dc-slider-frame', 'js_frame', {
                    ['dots']: navigationDots,
                })}
            >
                <ul className="amp-dc-slider-slides js_slides">{children}</ul>
                <span className="amp-dc-slider-prev js_prev">
                    <NavigatePrevious />
                </span>
                <span className="amp-dc-slider-next js_next">
                    <NavigateNext />
                </span>
            </div>
        </div>
    );
};

export default LegacySlider;
