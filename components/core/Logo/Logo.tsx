import React from 'react';
import Link from 'next/link';

interface Props {
    width?: number;
    height?: number;
}

const Logo = (props: Props) => {
    return (
        <Link passHref href="/">
            <img {...props} alt="" src="https://cdn.media.amplience.net/i/dcdemo/anyafinn-logo" />
        </Link>
    );
};

export default Logo;
