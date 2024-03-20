import React from 'react';
import Link from 'next/link';
import { Theme, styled } from '@mui/material';

const styles = (theme: Theme) => ({});

interface Props {
    classes?: any;
    className?: string;
    style?: React.CSSProperties;
    width?: number;
    height?: number;
}

const Logo = (props: Props) => {
    const { classes, ...other } = props;

    return (
        <Link passHref href="/">
            <img {...other} alt="" src="https://cdn.media.amplience.net/i/dcdemo/anyafinn-logo" />
        </Link>
    );
};

export default Logo;
