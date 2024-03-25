import { useUI } from '@components/ui';
import { Backdrop, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    classes?: any;
}

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
                style={{
                    height: 45,
                    width: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed' as 'fixed',
                    left: '80%',
                    zIndex: 1000,
                    display: isMobile && navigationToggle ? 'flex' : 'none',
                }}
                onClick={handleToggleNavigation}
            >
                <img
                    style={{ height: 17, width: 17 }}
                    width="32"
                    height="32"
                    src="/images/ic-anyafinn-close.svg"
                    alt="close"
                />
            </Link>
            <Backdrop
                className={classes?.backdrop}
                style={{
                    backgroundColor: 'rgba(255,255,255, 0.8)',
                    cursor: 'pointer',
                    zIndex: 999,
                }}
                open={isMobile && navigationToggle}
                onClick={handleToggleNavigation}
            ></Backdrop>
            {children}
        </div>
    );
};

export default NavigationToggleState;
