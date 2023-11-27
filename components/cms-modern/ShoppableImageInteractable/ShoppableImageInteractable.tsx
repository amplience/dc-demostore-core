import { Tooltip } from '@mui/material';
import Link from 'next/link';
import React, { ReactElement } from 'react';

const urlBuilder = (selector: string, target: string) => {
    let url = '#';
    switch (selector) {
        case '.page':
            url = `/${target}`;
            break;
        case '.link':
            url = target;
            break;
        case '.product':
            url = `/product/${target}`;
            break;
        case '.category':
            url = `/category/${target}`;
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
    return (
        <Link passHref href={urlBuilder(selector, target)}>
            <Tooltip title={titleBuilder(selector, target)} followCursor>
                {children}
            </Tooltip>
        </Link>
    );
};

export default ShoppableImageInteractable;
