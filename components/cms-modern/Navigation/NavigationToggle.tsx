import { useUI } from '@components/ui';
import Link from 'next/link';
import React from 'react';

const NavigationToggle = () => {
    const { navigationToggle, toggleNavigation } = useUI();
    const handleToggleNavigation = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        toggleNavigation(navigationToggle);
    };
    return (
        <Link
            passHref
            href="#"
            style={{
                marginLeft: '-30px',
                height: '45px',
                width: '45px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={handleToggleNavigation}
        >
            <img
                style={{
                    height: '17px',
                    width: '17px',
                }}
                src="/images/ic-anyafinn-menu.svg"
                alt="menu"
            />
        </Link>
    );
};
export default NavigationToggle;
