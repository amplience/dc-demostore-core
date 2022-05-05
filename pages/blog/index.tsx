import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import { useCmsContext } from '@lib/cms/CmsContext';
import React, { useEffect } from 'react';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { Breadcrumb, PageContent } from '@components/ui';
import { Typography } from '@mui/material';
import { ProductFacet } from '@components/product';
import { NavigationItem } from '@components/core/Masthead';
import { useAppContext } from '@lib/config/AppContext';
import _ from 'lodash';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const data = await fetchStandardPageData(
        {
            content: {},
        },
        context
    );

    return {
        props: {
            ...data,
        },
    };
}

export default function Womens({
    content,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { stagingApi, locale } = useCmsContext() || {};
    const navigationItem: NavigationItem = {
        type: 'page',
        href: '/blog',
        title: 'Blog',
        children: [],
        parents: [],
    };

    let { algolia } = useAppContext()
    useEffect(() => {
        const { instantsearch, algoliasearch } = window as any;

        const blogIndex = _.find(algolia.indexes, i => i.key === 'blog')
        if (blogIndex) {
            const search = instantsearch({
                indexName: stagingApi ? blogIndex.staging : blogIndex.prod,
                searchClient: algoliasearch(algolia.appId, algolia.apiKey),
                hitsPerPage: 5,
            });

            search.addWidget(
                instantsearch.widgets.configure({
                    filters:
                        (locale || 'en-US').indexOf('en-') === 0
                            ? `locale:en-US`
                            : `locale:${locale}`,
                }),
            );

            search.addWidget(
                instantsearch.widgets.searchBox({
                    container: '#searchbox',
                    placeholder: 'Search',
                })
            );

            search.addWidget(
                instantsearch.widgets.refinementList({
                    container: '#category-list',
                    attribute: 'snippet.category',
                })
            );

            search.addWidget(
                instantsearch.widgets.refinementList({
                    container: '#author-list',
                    attribute: 'snippet.author',
                })
            );

            search.addWidget(
                instantsearch.widgets.hits({
                    hitsPerPage: 5,
                    container: '#hits',
                    cssClasses: {
                        list: 'amp-dc-card-list-wrap',
                        item: 'amp-dc-card',
                    },
                    templates: {
                        item: ({ snippet, _meta }: any) => {
                            return `
                                <a class="amp-dc-card-wrap" href="/blog/${_meta.deliveryKey}">
                                    <div class="amp-dc-card-img-wrap">
                                        <picture class="amp-dc-image">
                                            <source type="image/webp" srcset="https://${snippet.image.image.defaultHost}/i/${snippet.image.image.endpoint}/${snippet.image.image.name}.webp?w=1000&upscale=false&aspect=1:2&sm=aspect&poi={($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.x},{($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.y},{$root.layer0.metadata.pointOfInterest.w},{$root.layer0.metadata.pointOfInterest.h}&scaleFit=poi&sm=aspect&aspect=1:1&qlt=85">
                                            <source type="image/jp2" srcset="https://${snippet.image.image.defaultHost}/i/${snippet.image.image.endpoint}/${snippet.image.image.name}.jp2?w=1000&upscale=false&aspect=1:2&sm=aspect&poi={($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.x},{($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.y},{$root.layer0.metadata.pointOfInterest.w},{$root.layer0.metadata.pointOfInterest.h}&scaleFit=poi&sm=aspect&aspect=1:1&qlt=75">
                                            <source type="image/jpeg" srcset="https://${snippet.image.image.defaultHost}/i/${snippet.image.image.endpoint}/${snippet.image.image.name}.jpg?w=1000&upscale=false&aspect=1:2&sm=aspect&poi={($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.x},{($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.y},{$root.layer0.metadata.pointOfInterest.w},{$root.layer0.metadata.pointOfInterest.h}&scaleFit=poi&sm=aspect&aspect=1:1&qlt=85">
                                            <img loading="lazy" src="https://${snippet.image.image.defaultHost}/i/${snippet.image.image.endpoint}/${snippet.image.image.name}?w=1000&upscale=false&aspect=1:2&sm=aspect&poi={($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.x},{($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.y},{$root.layer0.metadata.pointOfInterest.w},{$root.layer0.metadata.pointOfInterest.h}&scaleFit=poi&sm=aspect&aspect=1:1&qlt=85" class="amp-dc-image-pic" alt="${snippet.title}">
                                        </picture>
                                    </div>
                                    <div class="amp-dc-card-text-wrap">
                                        <p class="amp-dc-card-category">${snippet?.category?.join(', ') || ''}</p>
                                        <div class="amp-dc-card-name">${snippet.title}</div>
                                        <div class="amp-dc-card-description"><span>${snippet.author}</span><span>${snippet.blogdate}</span></div>
                                    </div>
                                </a>
                        `;
                        },
                    },
                })
            );

            search.addWidget(
                instantsearch.widgets.pagination({
                    container: '#pagination',
                })
            );

            search.addWidget(
                instantsearch.widgets.hitsPerPage({
                    container: '#hits-per-page',
                    items: [
                        { label: '5 hits per page', value: 5, default: true },
                        { label: '10 hits per page', value: 10 },
                    ],
                })
            );

            search.start();
        }
    }, [stagingApi, locale, algolia]);

    return (
        <>
            <PageContent className="blog-list__container">
                <div className="blog-list">
                    <div className="blog-list-facets">
                        <Typography variant="h6">
                            <Breadcrumb navigationItem={navigationItem} />
                        </Typography>
                        <Typography variant="h2" component="h2">
                            Blog
                        </Typography>
                        <div id="searchbox" className="ais-SearchBox" />
                        <ProductFacet title="Categories" className="blog-list-facet blog-list-facet--categories">
                            <div id="category-list" />
                        </ProductFacet>
                        <ProductFacet title="Author" className="blog-list-facet">
                            <div id="author-list" />
                        </ProductFacet>
                        <div id="hits-per-page" style={{ display: 'none' }} />
                    </div>
                    <div className="blog-list-results">
                        <div className="amp-dc-card-list amp-dc-prod-5-rows amp-dc-cards-hero amp-dc-cards-blog">
                            <div id="hits" />
                        </div>
                        <div id="pagination" />
                    </div>
                </div>
            </PageContent>
        </>
    );
}

Womens.Layout = Layout;
