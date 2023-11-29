import { Tooltip } from '@mui/material';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { ShoppableProductTooltip } from './ShoppableProductTooltip';
import { useECommerce } from '@components/core/Masthead/ECommerceContext';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ShoppableContent } from './ShoppableContent';

export enum InteractableType {
    PAGE = '.page',
    LINK = '.link',
    LINK_NEW = '.linkNew',
    PRODUCT = '.product',
    CATEGORY = '.category',
    DELIVERY_KEY = '.deliveryKey',
    TOOLTIP = '.tooltip',
}

const urlBuilder = (selector: string, target: string) => {
    let url = '#';
    switch (selector) {
        case InteractableType.PAGE:
            url = `/${target}`;
            break;
        case InteractableType.LINK:
            url = target;
            break;
        case InteractableType.LINK_NEW:
            url = target;
            break;
        case InteractableType.PRODUCT:
            url = `/product/${target}`;
            break;
        case InteractableType.CATEGORY:
            url = `/category/${target}`;
            break;
        case InteractableType.DELIVERY_KEY:
            url = target;
            break;
        default:
            break;
    }
    return url;
};

const titleBuilder = (selector: string, target: string) => {
    return `Target: ${target} | Selector: ${selector}`;
};

type ShoppableImageInteractableProps = {
    children: ReactElement;
    selector: string;
    target: string;
    tooltips: any[];
};

const ShoppableImageInteractable = ({ children, selector, target, tooltips }: ShoppableImageInteractableProps) => {
    const { categoriesBySlug } = useECommerce();

    switch (selector) {
        case InteractableType.PRODUCT: {
            return (
                <ShoppableProductTooltip title={urlBuilder(selector, target)} target={target}>
                    <Link passHref href={urlBuilder(selector, target)}>
                        {children}
                    </Link>
                </ShoppableProductTooltip>
            );
        }
        case InteractableType.CATEGORY: {
            return (
                <Link passHref href={urlBuilder(selector, target)}>
                    <Tooltip title={categoriesBySlug[target]?.name ?? target} followCursor>
                        {children}
                    </Tooltip>
                </Link>
            );
        }
        case InteractableType.LINK: {
            return (
                <Link passHref href={urlBuilder(selector, target)}>
                    <Tooltip title="View" followCursor>
                        {children}
                    </Tooltip>
                </Link>
            );
        }
        case InteractableType.LINK_NEW: {
            return (
                <a href={urlBuilder(selector, target)} target="_blank" rel="noopener noreferrer">
                    <Tooltip
                        title={
                            <div style={{ fontSize: 12 }}>
                                View <OpenInNewIcon fontSize="small" />
                            </div>
                        }
                        followCursor
                    >
                        {children}
                    </Tooltip>
                </a>
            );
        }
        case InteractableType.DELIVERY_KEY: {
            return <ShoppableContent title={urlBuilder(selector, target)} target={target} />;
        }
        case InteractableType.TOOLTIP: {
            return (
                <Tooltip title={tooltips.find(item => item.key === target).value} followCursor>
                    {children}
                </Tooltip>
            );
        }
        default: {
            return (
                <Link passHref href={urlBuilder(selector, target)}>
                    <Tooltip title={titleBuilder(selector, target)} followCursor>
                        {children}
                    </Tooltip>
                </Link>
            );
        }
    }
};

export default ShoppableImageInteractable;
