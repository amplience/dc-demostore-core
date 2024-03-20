import React from 'react';
import { Divider, Typography, useMediaQuery } from '@mui/material';
import { ContentBlock } from '@components/cms-modern';
import { CmsContent } from '@lib/cms/CmsContent';
import { NavigationItem } from '@components/core/Masthead/NavigationContext';
import Link from 'next/link';
import WithLazyContent from '../WithLazyContent';
import Skeleton from 'react-loading-skeleton';
import MegaMenuSimpleBanner from './MegaMenuSimpleBanner';

interface Props {
    children: NavigationItem[];
    content: CmsContent | undefined;
    handleRouteChange: () => void;
    closeMenu: () => void;
    title: string;
    href: string | undefined;
}

const MegaMenu = ({ children = [], content, handleRouteChange, closeMenu, title, href }: Props) => {
    const isMobile = useMediaQuery('(max-width:750px)');

    if (children.length === 0) {
        return <div></div>;
    }

    return (
        <div className="megaMenu">
            <Link passHref href="#" className="megaMenu__back" onClick={closeMenu}>
                <img src="/images/ic-anyafinn-back.svg" alt="back" /> <span>Back</span>
            </Link>
            <Link passHref href={href || '#'} onClick={handleRouteChange}>
                <h2 className="megaMenu__category"> {title} </h2>
            </Link>
            <div className="megaMenu__container">
                <div className="megaMenu__list__container">
                    {children.map((child: any, index: number) => (
                        <ul className="megaMenu__list" key={index}>
                            <h3 className="megaMenu__subCategory">
                                <Link passHref href={child.href} onClick={handleRouteChange}>
                                    <Typography variant="body1" component="p" className="megaMenu__list__item__link">
                                        {child.title}
                                    </Typography>
                                </Link>
                            </h3>
                            {child.children.map((child2: any, index2: number) => (
                                <li className="megaMenu__list__item" key={index2}>
                                    <Link passHref href={child2.href} onClick={handleRouteChange}>
                                        <Typography
                                            variant="body1"
                                            component="p"
                                            className="megaMenu__list__item__link"
                                        >
                                            {child2.title}
                                        </Typography>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
                {!isMobile && content && (
                    <div className="megaMenu__content">
                        <WithLazyContent request={{ id: content.id }}>
                            {({ content: fullContent }) => {
                                return fullContent?.image?.img?.image ? (
                                    <ContentBlock
                                        content={fullContent}
                                        components={{
                                            'https://demostore.amplience.com/content/simple-banner':
                                                MegaMenuSimpleBanner,
                                        }}
                                    />
                                ) : (
                                    <Skeleton />
                                );
                            }}
                        </WithLazyContent>
                    </div>
                )}
            </div>
            <Divider className="megaMenu--divider" />
        </div>
    );
};

export default MegaMenu;
