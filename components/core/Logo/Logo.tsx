import React from 'react';
import Link from 'next/link';

interface LogoProps {
    width?: number;
    height?: number;
}

const Logo = (props: LogoProps) => {
    return (
        <Link passHref href="/">
            <img {...props} alt="" src="https://cdn.media.amplience.net/i/dcdemo/anyafinn-logo" />
        </Link>
    );
};

export default Logo;
