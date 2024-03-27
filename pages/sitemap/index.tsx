import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { PageContent } from '@components/ui';
import { Typography } from '@mui/material';
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

function Sitemap({ content, params }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
            <div style={{ marginTop: 20, marginBottom: 40 }}>
                <Typography variant="h2">Sitemap</Typography>
            </div>
            <div style={{ marginTop: 10, marginBottom: 10 }}>
                {sections.map((section) => {
                    return (
                        <div key={nanoid()}>
                            <Link passHref href={`${section.href}${urlSuffix}`} target="_blank" rel="noreferrer">
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    style={{ padding: 10, borderBottom: '1px solid #bebebe' }}
                                >
                                    {section.title}
                                </Typography>
                            </Link>
                            <div style={{ marginTop: 10, marginBottom: 10 }}>
                                {section.children.map((child: any) => (
                                    <Link
                                        href={`${child.href}${urlSuffix}`}
                                        key={nanoid()}
                                        className={clsx('megaMenu__list__item__link')}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ marginTop: 10, marginBottom: 10 }}
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
