import React, { useState } from 'react';
import Search from '../Search/Search';
import MegaMenu from './MegaMenu';
import { NavigationItem } from '@components/core/Masthead/NavigationContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useUI } from '@components/ui';
import _ from 'lodash';

interface Props {
  pages: NavigationItem[];
  style?: React.CSSProperties;
}

const Navigation: React.FC<Props> = ({ pages, style }) => {
  const { navigationToggle, toggleNavigation } = useUI();
  const [selectedMenuKey, setSelectedMenuKey] = useState<number | null>(null);
  const router = useRouter();
  const isRouteActive = (href: string | undefined, category: any): boolean => {
    // bringing this in here if we want to use somthing from category instead of href(delivery key) to match avtive top nav item
    // But I htink we have to use href/key
    //console.log(router)
    //console.log(category)

    // !!using the first word in the category slug as the current category
    // => full path should be present in slugs, and 1st level category slug shouldn't contain '-'
    // TODO: update logic or change new catalog slugs
    const [route] = router?.asPath?.match(/^(\/(category\/[^-]*)|(\/blog))/) || [router?.asPath];
    if (href) {
      if (href.startsWith('http')) {
        const url = new URL(href);
        const path = url.href.replace( url.origin, '');
        //console.log(path + ' ==? ' + route)
        return path === route;
      } else {
        //console.log('w/ href: ', href + ' ==? ' + route)
        return href === route;
      }
    }
    return false;
  };

  const handleRouteChange = (): void => {
    if (navigationToggle) {
      toggleNavigation(navigationToggle);
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number
  ): void => {
    if (navigationToggle) {
      event.preventDefault();
      setSelectedMenuKey(index);
    }
  };

  const isMenuOpen = (index: number) => index === selectedMenuKey;
  const closeMenu = () => {
    setSelectedMenuKey(null);
  };

  return (
    <nav className="navigation" style={style}>
      <ul className="navigation__list">
        {pages.map(({ title, href, children = [], content, category }, index) => {
          // make sure these categories have children or they won't display properly
          let categoriesWithChildren = children.filter(child => child.children.length > 0)

          return (
            <li
              key={index}
              className={clsx('navigation__list__item', {
                ['navigation__list__item--active']: isRouteActive(href, category),
                ['navigation__list__item--open']: isMenuOpen(index),
              })}
            >
              {title && href && (
                <Link href={href}>
                  <a
                    onClick={(event) => children.length === 0 ? handleRouteChange() : handleClick(event, index)}
                    className="navigation__list__item__link"
                  >
                    {title}
                  </a>
                </Link>
              )}
              {children.length > 0 ? 
                <MegaMenu
                  content={content?.menu?.content}
                  handleRouteChange={handleRouteChange}
                  closeMenu={closeMenu}
                  title={title}
                  href={href}
                >{children}</MegaMenu> : <div></div>
              }
            </li>
          );
        })}
        <li className="navigation__list__item navigation__list__item--search" key={pages.length}>
          <Search />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
