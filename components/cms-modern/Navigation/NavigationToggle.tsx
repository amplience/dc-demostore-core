import { useUI } from '@components/ui';
import { Theme } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

interface Props {
    classes?: any;
}

const styles = (theme: Theme) => ({
    root: {
        display: 'none',
        '@media (max-width: 750px)': {
            display: 'flex',
        },
    },
    icons: {
        marginLeft: '-30px',
        height: '45px',
        width: '45px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        height: '17px',
        width: '17px',
    },
});
const NavigationToggle = ({ classes }: Props) => {
    const { navigationToggle, toggleNavigation } = useUI();
    const handleToggleNavigation = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        toggleNavigation(navigationToggle);
    };
    return (
        <Link href="#" className={clsx(classes?.root, classes?.icons)} onClick={handleToggleNavigation}>
            <img className={classes?.iconImage} src="/images/ic-anyafinn-menu.svg" alt="menu" />
        </Link>
    );
};
export default NavigationToggle;
