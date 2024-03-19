import React, { PropsWithChildren } from 'react';
import { Theme } from '@mui/material';
import clsx from 'clsx';

const styles = (theme: Theme) => ({
    root: {
        padding: '0 32px',
        margin: '0 auto',
        maxWidth: 1400,
    },
});

interface Props extends PropsWithChildren {
    classes?: any;
    className?: string;
    style?: React.CSSProperties;
}

const PageContent = (props: Props) => {
    const { classes, className, children, ...other } = props;

    return (
        <div className={clsx(classes?.root, className)} {...other}>
            {children}
        </div>
    );
};

export default PageContent;
