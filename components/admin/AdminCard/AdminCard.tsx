import React, { PropsWithChildren } from 'react';
import { Theme, Card, styled } from '@mui/material';
import clsx from 'clsx';

const styles = (theme: Theme) => ({
    root: {
        borderLeft: `6px solid ${theme.palette.primary.main}`,
        width: '100%',
        marginBottom: theme.spacing(),
    },
});

interface Props extends PropsWithChildren {
    classes?: any;
    className?: string;
    style?: React.CSSProperties;
}

const AdminCard = (props: Props) => {
    const { classes, className, children, ...other } = props;

    return (
        <Card className={clsx(classes?.root, className)} {...other}>
            {children}
        </Card>
    );
};

export default styled(AdminCard)(styles);
