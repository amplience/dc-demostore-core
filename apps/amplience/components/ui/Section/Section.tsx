import React, { PropsWithChildren } from 'react';
import { Theme, Typography } from '@mui/material';
import clsx from 'clsx';
import { withStyles, WithStyles } from '@mui/styles'

const styles = (theme: Theme) => ({
    root: {
        padding: '40px 50px'
    },
    title: {
        //color: '#bebebe',
        //fontSize: 24,
        //lineHeight: '1.5em'
    },
    content: {
        padding: '40px 0px 40px 0px',
        borderTop: '1px solid #bebebe',
        borderBottom: '1px solid #bebebe',
        '&:empty': {
            display: 'none'
        }
    }
});

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
    className?: string;
    style?: React.CSSProperties;
    title: string;
}

const Section: React.SFC<Props> = (props) => {
    const {
        classes,
        className,
        title,
        children,
        ...other
    } = props;

    return (
        <div className={clsx(classes.root, className)}>
            {
                title && <div>
                    <Typography className={classes.title} component={"div"} variant="h2">
                        {title}
                    </Typography>
                </div>
            }
            {
                children && <div className={classes.content}>
                    {children}
                </div>
            }
            
        </div>
    );
};

export default withStyles(styles)(Section);