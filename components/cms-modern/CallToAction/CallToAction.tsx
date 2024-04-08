import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useContentAnalytics } from '@lib/analytics';
import Link from 'next/link';

interface LayoutProps extends PropsWithChildren {
    href: string;
    className?: string;
    style?: React.CSSProperties;
    variant?: 'outlined' | 'contained';
}

const Layout = ({ children, href, className, variant = 'outlined', ...other }: LayoutProps) => {
    const { trackEvent } = useContentAnalytics();

    const handleTrack = (e: any) => {
        trackEvent({
            category: 'Content',
            action: 'ClickCta',
            label: href,
        });
    };

    return href ? (
        <Link
            onClick={handleTrack}
            href={href}
            className={clsx(
                `af-call-to-action`,
                {
                    ['af-call-to-action-dark']: variant === 'contained',
                },
                className,
            )}
            {...other}
        >
            {children}
        </Link>
    ) : null;
};

export default Layout;
