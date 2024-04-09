import React, { PropsWithChildren } from 'react';

interface PageContentProps extends PropsWithChildren {
    className?: string;
}

const PageContent = (props: PageContentProps) => {
    const { className, children, ...other } = props;

    return (
        <div
            style={{
                padding: '0 32px',
                margin: '0 auto',
                maxWidth: 1400,
            }}
            className={className}
            {...other}
        >
            {children}
        </div>
    );
};

export default PageContent;
