import React from 'react';
import { Divider, useMediaQuery } from '@mui/material';
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

const MegaMenu: React.FC<Props> = ({
    children = [],
    content,
    handleRouteChange,
    closeMenu,
    title,
    href
}) => {
    const isMobile = useMediaQuery('(max-width:750px)');

    if (children.length === 0) {
        return <div></div>;
    }

    return (<div className="megaMenu">
        <a href="#" className="megaMenu__back" onClick={closeMenu}>
            <img src="/images/ic-anyafinn-back.svg" alt="back" /> <span>Back</span>
        </a>
        <Link href={href || '#'}>
            <a onClick={handleRouteChange}>
                <h2 className="megaMenu__category"> {title} </h2>
            </a>
        </Link>
        <div className="megaMenu__container">
            <div className="megaMenu__list__container">
                {children.map((child: any, index: number) => <ul className="megaMenu__list" key={index}>
                    <h3 className="megaMenu__subCategory">
                        <Link href={child.href}>
                            <a className="megaMenu__list__item__link" onClick={handleRouteChange}>{child.title}</a>
                        </Link>
                    </h3>
                    {child.children.map((child2: any, index2: number) => <li className="megaMenu__list__item" key={index2}>
                        <Link href={child2.href}>
                            <a className="megaMenu__list__item__link" onClick={handleRouteChange}>{child2.title}</a>
                        </Link>
                    </li>)}
                </ul>)}
            </div>
            {!isMobile && content && (
                <div className="megaMenu__content">
                    <WithLazyContent request={{ id: content.id }}>
                        {({ content: fullContent }) => {
                            return fullContent?.image?.img?.image ? (<ContentBlock
                                content={fullContent}
                                components={{
                                    'https://demostore.amplience.com/content/simple-banner': MegaMenuSimpleBanner,
                                }}
                            />) : (<Skeleton />);
                        }}
                    </WithLazyContent>
                </div>
            )}
        </div>
        <Divider className="megaMenu--divider" />
    </div>);
};

export default MegaMenu;
