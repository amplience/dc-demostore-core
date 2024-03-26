import React, { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
    classes?: any;
    className?: string;
    style?: React.CSSProperties;
    overlayStyle?: React.CSSProperties;
    overlay?: React.ReactNode;
    variant?: 'responsive' | 'floating' | 'stacked';
    floatingHorizontalAlignment?: 'left' | 'center' | 'right';
    floatingVerticalAlignment?: 'top' | 'middle' | 'bottom';
}

const Overlay = (props: Props) => {
    const {
        className,
        children,
        overlay,
        overlayStyle,
        variant,
        floatingHorizontalAlignment,
        floatingVerticalAlignment,
        ...other
    } = props;

    const isResponsive = variant === 'responsive';
    const isFloating = variant === 'floating';
    const isStacked = variant === 'stacked';
    const isFloatingLeft = floatingHorizontalAlignment === 'left';
    const isFloatingCenter = floatingHorizontalAlignment === 'center';
    const isFloatingRight = floatingHorizontalAlignment === 'right';
    const isFloatingTop = floatingVerticalAlignment === 'top';
    const isFloatingMiddle = floatingVerticalAlignment === 'middle';
    const isFloatingBottom = floatingVerticalAlignment === 'bottom';

    return (
        <div style={{ position: 'relative' as 'relative' }} className={clsx(className)} {...other}>
            <div>{children}</div>
            <Box
                sx={(theme) => ({
                    position: isResponsive || isFloating ? 'absolute' : undefined,
                    left: isResponsive || isFloating ? 0 : undefined,
                    right: isResponsive || isFloating ? 0 : undefined,
                    top: isResponsive || isFloating ? 0 : undefined,
                    bottom: isResponsive || isFloating ? 0 : undefined,
                    [theme.breakpoints.down('md')]: {
                        position: isResponsive ? 'unset' : undefined,
                        width: isResponsive ? '100%' : undefined,
                        border: isResponsive ? 'none !important' : undefined,
                    },
                })}
            >
                <Box
                    sx={(theme) => ({
                        position: isResponsive || isFloating ? 'absolute' : 'unset',
                        display: isResponsive || isFloating ? 'inline-block' : 'unset',
                        [theme.breakpoints.down('md')]: {
                            position: isResponsive ? 'unset' : undefined,
                            transform: isResponsive ? 'unset !important' : undefined,
                            width: isResponsive ? '100% !important' : undefined,
                            border: isResponsive ? 'none !important' : undefined,
                        },
                        left: isFloatingLeft ? 0 : isFloatingCenter ? '50%' : 'unset',
                        right: isFloatingRight ? 0 : 'unset',
                        top: isFloatingTop ? 0 : isFloatingMiddle ? '50%' : 'unset',
                        bottom: isFloatingBottom ? 0 : 'unset',
                        transform:
                            isFloatingMiddle && isStacked
                                ? 'unset !important'
                                : isFloatingMiddle && isFloatingCenter
                                ? 'translateX(-50%) translateY(-50%)'
                                : isFloatingMiddle
                                ? 'translateY(-50%)'
                                : isFloatingCenter
                                ? 'translateX(-50%)'
                                : 'unset',
                    })}
                    style={overlayStyle}
                >
                    {overlay}
                </Box>
            </Box>
        </div>
    );
};

export default Overlay;
