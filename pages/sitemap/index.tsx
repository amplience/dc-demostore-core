import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { PageContent } from '@components/ui';
import { Theme, Typography } from '@mui/material';
import { NavigationItem, useNavigation } from '@components/core/Masthead';
import { useMemo } from 'react';
import { walkNavigationItems } from '@components/core/Masthead/walkNavigation';
import clsx from 'clsx';
import { parse } from 'url';
import { nanoid } from 'nanoid';
import Link from 'next/link';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const data = await fetchStandardPageData(
        {
            content: {},
        },
        context
    );

    const { url = '' } = context.req || {};

    const { query } = parse(url, true);

    const { vse: queryStringVse, locale: queryStringLocale } = query || {};

    return {
        props: {
            ...data,
            params: {
                vse: queryStringVse || null,
                locale: queryStringLocale || null,
            },
        },
    };
}

const styles = (theme: Theme) => ({
    header: {
        marginTop: 20,
        marginBottom: 40,
    },
    links: {},
    section: {
        padding: 10,
        borderBottom: '1px solid #bebebe',
    },
    sectionLinks: {
        marginTop: 10,
        marginBottom: 10,
    },
    sectionLink: {
        padding: 10,
        [theme.breakpoints.down('md')]: {
            display: 'block',
        },
    },
});

type Props = {
    classes?: any;
};

function Sitemap({ classes, content, params }: InferGetServerSidePropsType<typeof getServerSideProps> & Props) {
    const { rootItems } = useNavigation();

    const { vse, locale } = params || {};

    const sections = useMemo(() => {
        let links: any[] = [];

        walkNavigationItems(rootItems, (item: NavigationItem, parents: NavigationItem[]) => {
            if (item.children.length === 0) {
                return;
            }

            links.push({
                title: `${parents.map((x) => x.title).join(' / ')}${parents.length > 0 ? ' / ' : ''}${item.title}`,
                href: item.href,
                children: item.children
                    .filter((x) => x.href)
                    .map((x) => {
                        return { title: x.title, href: x.href };
                    }),
            });
        });

        return links;
    }, [rootItems]);

    const urlSuffix = useMemo(() => {
        const params: string[] = [];
        if (vse) {
            params.push(`vse=${vse}`);
        }
        if (locale) {
            params.push(`locale=${locale}`);
        }
        return '?' + params.join('&');
    }, [vse, locale]);

    return (
        <PageContent>
            <div className={classes?.header}>
                <Typography variant="h2">Sitemap</Typography>
            </div>
            <div className={classes?.links}>
                {sections.map((section) => {
                    return (
                        <div key={nanoid()}>
                            <Link passHref href={`${section.href}${urlSuffix}`} target="_blank" rel="noreferrer">
                                <Typography variant="h4" component="h3" className={classes?.section}>
                                    {section.title}
                                </Typography>
                            </Link>
                            <div className={classes?.sectionLinks}>
                                {section.children.map((child: any) => (
                                    <Link
                                        href={`${child.href}${urlSuffix}`}
                                        key={nanoid()}
                                        className={clsx('megaMenu__list__item__link', classes?.sectionLink)}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {child.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </PageContent>
    );
}

let component = Sitemap;
(component as any).Layout = Layout;
export default component;
