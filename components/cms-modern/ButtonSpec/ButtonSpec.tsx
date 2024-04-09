import React from 'react';
import { CallToAction } from '@components/cms-modern';
import './ButtonSpec.scss';
import { Button } from '@mui/material';
import Link from 'next/link';

const ButtonSpec = () => {
    return (
        <div className="button-spec">
            <ul style={{ listStyleType: 'none' }}>
                <li style={{ listStyleType: 'none' }}>
                    <h3 style={{ fontSize: '18px' }}>CallToAction Component</h3>
                    <CallToAction href="#">Example Call to action</CallToAction>
                </li>
                <li style={{ listStyleType: 'none' }}>
                    <h3 style={{ fontSize: '18px' }}>Footer link</h3>
                    <Link href="#" className="button-spec__footer-link">
                        Footer link
                    </Link>
                </li>
                <li style={{ listStyleType: 'none' }}>
                    <h3 style={{ fontSize: '18px' }}>Blog link</h3>
                    <Link href="#" className="button-spec__blog-link">
                        Blog link
                    </Link>
                </li>
                <li style={{ listStyleType: 'none' }}>
                    <h3 style={{ fontSize: '18px' }}>MegaMenu link</h3>
                    <Link href="#" className="button-spec__mega-menu-link">
                        Mega menu link
                    </Link>
                </li>
                <li style={{ listStyleType: 'none' }}>
                    <h3 style={{ fontSize: '18px' }}>Form button</h3>
                    <button type="button" className="button-spec__dialog-button button-spec__dialog-button--light">
                        Light form button
                    </button>
                    <button type="button" className="button-spec__dialog-button button-spec__dialog-button--dark">
                        Dark form button
                    </button>
                </li>
                <li style={{ listStyleType: 'none' }}>
                    <h3 style={{ fontSize: '18px' }}>Material UI button (used in ProductCard)</h3>
                    <Button color="primary" variant="contained" className="button-spec__material-button">
                        BUY NOW
                    </Button>
                </li>
            </ul>
        </div>
    );
};
export default ButtonSpec;
