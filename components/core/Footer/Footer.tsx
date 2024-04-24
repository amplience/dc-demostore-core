import React, { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography } from '@mui/material';
import withConfig from '@components/core/Config/withConfig';

interface FooterProps {
    newsletterPlaceholderText?: string;
    copyrightNoticeText?: string;
    style?: React.CSSProperties;
}

const Footer = (props: FooterProps) => {
    const isMobile = useMediaQuery('(max-width:750px)');
    const [linkCategories, setLinkCategories] = useState([
        {
            visible: false,
            title: 'Delivery',
            links: ['Track your order', 'Delivery & collection', 'Returns & refunds', 'International orders'],
        },
        {
            visible: false,
            title: 'Help',
            links: ['Customer services', 'Contact us', 'Our stores', 'Our services'],
        },
        {
            visible: false,
            title: 'Shopping',
            links: [
                'Gift Cards and vouchers',
                'Shop by brand',
                'Terms & conditions',
                'Secure shopping',
                'Our privacy notice',
                'Cookies',
                'Our apps',
                'Black Friday',
            ],
        },
        {
            visible: false,
            title: 'Company',
            links: ['The ANYA FINN story', 'Careers', 'Sustainability policy', 'Modern slavery', 'FAQs'],
        },
    ]);

    return (
        <footer className="footer">
            <div className="footer__column-break">
                <section className="footer__sitemap">
                    {linkCategories.map((i, idx) => {
                        return (
                            <div
                                key={idx}
                                className={`footer__sitemap-column ${
                                    isMobile && !i.visible ? 'footer__sitemap-column--collapsed' : ''
                                }`}
                            >
                                <Typography
                                    variant="subtitle1"
                                    component="h4"
                                    className={isMobile ? 'footer__sitemap-column-title--mobile' : ''}
                                    onClick={() => {
                                        if (!isMobile) {
                                            return;
                                        }
                                        const newLinkState = [...linkCategories];
                                        newLinkState[idx].visible = !newLinkState[idx].visible;
                                        setLinkCategories(newLinkState);
                                    }}
                                >
                                    {isMobile && i.visible ? (
                                        <img src="/images/ic-anyafinn-minus.svg" alt="minus" />
                                    ) : isMobile && !i.visible ? (
                                        <img src="/images/ic-anyafinn-plus.svg" alt="plus" />
                                    ) : null}
                                    {i.title}
                                </Typography>
                                {i.visible || !isMobile ? (
                                    <ul>
                                        {i.links.map((j, idx2) => {
                                            return (
                                                <li key={idx2}>
                                                    <Typography variant="body2" component="a" href="#">
                                                        {j}
                                                    </Typography>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : null}
                            </div>
                        );
                    })}
                </section>
                <section className="footer__signup">
                    <Typography variant="subtitle1" component="h4">
                        Stay in touch
                    </Typography>
                    <div className="footer__signup-input-wrap">
                        <input
                            type="text"
                            placeholder={props.newsletterPlaceholderText || 'Sign up for ANYA FINN news...'}
                        />
                        <img src="/images/ic-email.svg" alt="email" />
                    </div>
                </section>
            </div>
            <section className="footer__social-links">
                <div className="footer__social-link-wrapper">
                    <img src="/images/AnyaFinn_social.png" width="50%" alt="social" />
                </div>
            </section>
            <section className="footer__watermark">
                <Typography variant="h6" component="h6">
                    {props.copyrightNoticeText || 'Copyright 2020 ANYA FINN'}
                </Typography>
            </section>
        </footer>
    );
};
export default withConfig('footer')(Footer);
