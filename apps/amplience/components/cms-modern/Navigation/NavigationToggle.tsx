import { useUI } from '@components/ui';
import { Theme } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { withStyles, WithStyles } from '@mui/styles'

interface Props extends WithStyles<typeof styles> {}
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
const NavigationToggle: React.FC<Props> = ({ classes }) => {
    const { navigationToggle, toggleNavigation } = useUI();
    const handleToggleNavigation = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        event.preventDefault();
        toggleNavigation(navigationToggle);
    };
    return (
        <a
            href="#"
            className={clsx(classes.root, classes.icons)}
            onClick={handleToggleNavigation}
        >
            <img
                className={classes.iconImage}
                src="/images/ic-anyafinn-menu.svg"
                alt="menu"
            />
        </a>
    );
};
export default withStyles(styles)(NavigationToggle);
