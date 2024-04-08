import React, { PropsWithChildren } from 'react';
import { Paper } from '@mui/material';

interface SidebarProps extends PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
    open: boolean;
    variant?: 'left' | 'right';
    onClose?: () => void;
}

const Sidebar = (props: SidebarProps) => {
    const { variant = 'left', open, children, onClose, ...other } = props;
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div {...other}>
            <div
                onClick={handleClose}
                style={{
                    position: 'fixed' as 'fixed',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1100,
                    transition: 'all 200ms ease-out',
                    display: open ? 'unset' : 'none',
                    background: open ? 'rgba(0,0,0,0.3)' : 'unset',
                }}
            ></div>
            <aside
                style={{
                    position: 'fixed' as 'fixed',
                    width: 400,
                    bottom: 0,
                    top: 0,
                    zIndex: 1100,
                    transition: 'all 200ms ease-out',
                    left: variant === 'left' ? (open ? 0 : -400) : 'unset',
                    right: variant === 'right' ? (open ? 0 : -400) : 'unset',
                }}
            >
                <Paper
                    style={{
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto' as 'auto',
                    }}
                    elevation={3}
                >
                    {children}
                </Paper>
            </aside>
        </div>
    );
};

export default Sidebar;
