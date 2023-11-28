import { Tooltip } from '@mui/material';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { ShoppableProductTooltip } from './ShoppableProductTooltip';
import { useECommerce } from '@components/core/Masthead/ECommerceContext';

export enum InteractableType {
    PAGE = '.page',
    LINK = '.link',
    PRODUCT = '.product',
    CATEGORY = '.category',
    DELIVERY_KEY = '.deliveryKey',
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
};

const ShoppableImageInteractable = ({ children, selector, target }: ShoppableImageInteractableProps) => {
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
