import React, { PropsWithChildren } from 'react';
import { Typography } from '@mui/material';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
    className?: string;
    title: string;
}

const Section = (props: Props) => {
    const { className, title, children, ...other } = props;

    return (
        <div style={{ padding: '40px 50px' }} className={clsx(className)} {...other}>
            {title && (
                <div>
                    <Typography component={'div'} variant="h2">
                        {title}
                    </Typography>
                </div>
            )}
            {children && (
                <div
                    style={{
                        padding: '40px 0px 40px 0px',
                        borderTop: '1px solid #bebebe',
                        borderBottom: '1px solid #bebebe',
                        display: children ? 'block' : 'none',
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Section;
