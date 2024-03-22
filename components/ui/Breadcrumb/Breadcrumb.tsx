import React, { useMemo } from 'react';
import { Theme, Breadcrumbs, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NavigationItem, useNavigation } from '@components/core/Masthead';
import { useUserContext } from '@lib/user/UserContext';
import { nanoid } from 'nanoid';
import Link from 'next/link';

interface Props {
    loading?: boolean;
    navigationItem?: NavigationItem;
}

const Breadcrumb = (props: Props) => {
    const { navigationItem, loading = false, ...other } = props;
    const { findByHref } = useNavigation();
    const { asPath } = useRouter();
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
    return loading ? (
        <Breadcrumbs aria-label="breadcrumb" {...other}>
            <Link
                color="inherit"
                href="/"
                style={{
                    textTransform: 'uppercase' as 'uppercase',
                }}
            >
                &nbsp;
            </Link>
        </Breadcrumbs>
    ) : (
        <Breadcrumbs aria-label="breadcrumb" {...other}>
            <Link
                passHref
                color="inherit"
                href="/"
                style={{
                    textTransform: 'uppercase' as 'uppercase',
                }}
            >
                <Typography variant="h4">{language === 'de' ? 'Haupt' : 'Home'}</Typography>
            </Link>
            {nodes.map((node) => {
                return (
                    <Link
                        passHref
                        key={nanoid()}
                        color="inherit"
                        href={node.href as string}
                        style={{
                            textTransform: 'uppercase' as 'uppercase',
                        }}
                    >
                        <Typography variant="h4">{node.title}</Typography>
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default Breadcrumb;
