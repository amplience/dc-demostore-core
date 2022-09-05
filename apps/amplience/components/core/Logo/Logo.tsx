import React from 'react';
import Link from 'next/link';
import { Theme } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles'

const styles = (theme: Theme) => ({
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    width?: number;
    height?: number;
}

const Logo: React.SFC<Props> = (props) => {
    const {
        classes,
        ...other
    } = props;

    return (
        <Link href="/">
            <a>
                <img {...other} alt="" src="https://cdn.media.amplience.net/i/dcdemo/anyafinn-logo" />
            </a>
        </Link>
    );
};

export default withStyles(styles)(Logo);