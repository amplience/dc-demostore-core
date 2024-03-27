import React, { PropsWithChildren } from 'react';
import s from './ComponentFrame.module.css';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
    className?: string;
    menu?: React.ReactElement;

    OverlayProps?: {
        className?: string;
    };
    MenuProps?: {
        className?: string;
    };
}

const ComponentFrame = ({ children, menu, className, MenuProps, OverlayProps }: Props) => {
    return (
        <div className={clsx(s.root, className)}>
            <div className={s.content}>{children}</div>
            <div className={clsx(s.overlay, OverlayProps?.className)}>
                <div className={clsx(s.menu, MenuProps?.className)}>{menu}</div>
            </div>
        </div>
    );
};

export default ComponentFrame;
