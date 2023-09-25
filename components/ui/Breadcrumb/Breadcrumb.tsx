import React, { useMemo } from 'react';
import { Theme, Breadcrumbs, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { NavigationItem, useNavigation } from '@components/core/Masthead';
import { useUserContext } from '@lib/user/UserContext';
import { nanoid } from 'nanoid'
import { withStyles, WithStyles } from '@mui/styles'
import Link from 'next/link';

const styles = (theme: Theme) => ({
    root: {

    },
    link: {
        textTransform: 'uppercase' as 'uppercase'
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    
    loading?: boolean;
    navigationItem?: NavigationItem;
}

const Breadcrumb: React.SFC<Props> = (props) => {
    const {
        className,
        classes,
        navigationItem,
        loading = false,
        ...other
    } = props;

    const {
        findByHref
    } = useNavigation();

    const {
        asPath
    } = useRouter();

    const nodes = useMemo(() => {
        if (navigationItem) {
            return [...navigationItem.parents, navigationItem];
        }
        let url = asPath;
        if (url.indexOf('?') !== -1) {
            url = url.slice(0, url.indexOf('?'));
        }
        if (url.indexOf('#') !== -1) {
            url = url.slice(0, url.indexOf('#'));
        }

        const current = findByHref(url);
        if (current) {
            return [...current.parents, current];
        }
        return [];
    }, [navigationItem, asPath, findByHref]);

    const { language } = useUserContext();

    // NOVADEV-18: Add 'loading' skeleton for breadcrumb and category name on PLP
    return loading ? 
            <Breadcrumbs aria-label="breadcrumb" className={clsx(classes.root, className)} {...other}>
                <Link color="inherit" href="/" passHref className={classes.link}>&nbsp;</Link>
            </Breadcrumbs>
        : 
            <Breadcrumbs aria-label="breadcrumb" className={clsx(classes.root, className)} {...other}>
                <Link color="inherit" href="/" passHref className={classes.link}>
                    <a href="#"><Typography variant="h4">{ language === "de" ? 'Haupt' : 'Home' }</Typography></a>
                </Link>
                {
                    nodes.map(node => {
                        return <Link key={ nanoid() } color="inherit" href={node.href as string} passHref className={classes.link}>
                            <a><Typography variant="h4">{node.title}</Typography></a>
                        </Link>
                    })
                }
            </Breadcrumbs>;
};

export default withStyles(styles)(Breadcrumb);