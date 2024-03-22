import { useUI } from '@components/ui';
import { Backdrop, Theme, useMediaQuery } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    classes?: any;
}

// TODO: migrate styles
const styles = (theme: Theme) => ({
    root: {},
    backdrop: {
        backgroundColor: 'rgba(255,255,255, 0.8)',
        cursor: 'pointer',
        zIndex: theme.zIndex.drawer - 1,
    },
    icon: {
        display: 'none',
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed' as 'fixed',
        left: '80%',
        zIndex: theme.zIndex.drawer,
    },
    iconImage: {
        height: 17,
        width: 17,
    },
    show: {
        display: 'flex',
    },
});

const NavigationToggleState = ({ classes, children }: Props) => {
    const { navigationToggle, toggleNavigation } = useUI();
    const handleToggleNavigation = () => {
        toggleNavigation(navigationToggle);
    };
    const isMobile = useMediaQuery('(max-width:750px)');

    return (
        <div className={navigationToggle ? 'navigation--open' : 'navigation--closed'}>
            <Link
                passHref
                href="#"
                className={clsx(classes?.icon, {
                    [classes?.show]: isMobile && navigationToggle,
                })}
                onClick={handleToggleNavigation}
            >
                <img
                    className={classes?.iconImage}
                    width="32"
                    height="32"
                    src="/images/ic-anyafinn-close.svg"
                    alt="close"
                />
            </Link>
            <Backdrop
                className={classes?.backdrop}
                open={isMobile && navigationToggle}
                onClick={handleToggleNavigation}
            ></Backdrop>
            {children}
        </div>
    );
};

export default NavigationToggleState;
