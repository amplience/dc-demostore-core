import { Divider, Drawer, IconButton, Tooltip, styled } from '@mui/material';
import Link from 'next/link';
import React, { ReactElement, useState } from 'react';
import { ShoppableProductTooltip } from './ShoppableProductTooltip';
import { useECommerce } from '@components/core/Masthead/ECommerceContext';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AmplienceContent from '../AmplienceContent/AmplienceContent';

export enum InteractableType {
    PAGE = '.page',
    LINK = '.link',
    LINK_NEW = '.linkNew',
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
};

const ShoppableImageInteractable = ({ children, selector, target }: ShoppableImageInteractableProps) => {
    const { categoriesBySlug } = useECommerce();
    const [drawerOpen, setDrawerOpen] = useState(false);

    switch (selector) {
        case InteractableType.PRODUCT: {
            return (
                <ShoppableProductTooltip target={target}>
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
            const DrawerHeader = styled('div')(({ theme }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: theme.spacing(0, 1),
                // necessary for content to be below app bar
                ...theme.mixins.toolbar,
                justifyContent: 'flex-end',
            }));

            return (
                <>
                    <a role="button" onClick={() => setDrawerOpen(true)}>
                        <Tooltip title="More Details" followCursor>
                            {children}
                        </Tooltip>
                    </a>
                    <Drawer
                        anchor="right"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        PaperProps={{ sx: { width: '75%' } }}
                    >
                        <DrawerHeader>
                            <IconButton onClick={() => setDrawerOpen(false)}>
                                <ChevronRightIcon />
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <AmplienceContent deliveryKey={target} />
                    </Drawer>
                </>
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
