import { GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import { useCmsContext } from '@lib/cms/CmsContext';
import React from 'react';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { Breadcrumb, PageContent } from '@components/ui';
import { Box, Grid, Typography } from '@mui/material';
import { NavigationItem } from '@components/core/Masthead';
import { useAppContext } from '@lib/config/AppContext';
import { useAcceleratedMedia } from '@components/admin/AdminPanel/context/AcceleratedMediaContext';
import { ImageFormat } from '@utils/getImageURL';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, SearchBox, RefinementList } from 'react-instantsearch';
import Link from 'next/link';
import { Image } from '@components/cms-modern';
import DynamicBlogListCard from '@components/cms-modern/DynamicBlogList/DynamicBlogListCard';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const data = await fetchStandardPageData(
        {
            content: {},
        },
        context,
    );

    return {
        props: {
            ...data,
        },
    };
}

export default function Blog() {
    const navigationItem: NavigationItem = {
        type: 'page',
        href: '/blog',
        title: 'Blog',
        children: [],
        parents: [],
    };
    let { algolia, cms } = useAppContext();
    const { stagingApi } = useCmsContext() || {};
    const { acceleratedMedia } = useAcceleratedMedia();
    let format = 'auto';
    if (acceleratedMedia) format = ImageFormat.AVIF;
    const searchClient = algoliasearch(algolia.appId, algolia.apiKey);
    let hub = cms.hub;
    let indexName = stagingApi ? `${hub}.blog-staging` : `${hub}.blog-production`;

    function Hit(props: any) {
        return (
            <Box
                style={{
                    float: 'left',
                    marginRight: 15,
                    marginBottom: 15,
                    width: '350px',
                }}
            >
                <DynamicBlogListCard data={props.hit} />
            </Box>
        );
    }

    return (
        <PageContent>
            <Typography variant="h6">
                <Breadcrumb navigationItem={navigationItem} />
            </Typography>
            <Typography variant="h2" component="h2">
                Blog
            </Typography>
            <InstantSearch indexName={indexName} searchClient={searchClient}>
                <Box
                    style={{
                        height: '100%',
                        marginRight: 20,
                        marginTop: 20,
                    }}
                    sx={{
                        float: { sd: 'unset', md: 'left' },
                    }}
                >
                    <SearchBox style={{ marginBottom: 20 }} />
                    <Typography style={{ marginBottom: 10 }} variant="h4">
                        Categories
                    </Typography>
                    <RefinementList
                        style={{ marginBottom: 20 }}
                        attribute="snippet.category"
                        searchable={false}
                        searchablePlaceholder="Search categories"
                        showMore={false}
                    />
                    <Typography style={{ marginBottom: 10 }} variant="h4">
                        Authors
                    </Typography>
                    <RefinementList
                        style={{ marginBottom: 20 }}
                        attribute="snippet.author"
                        searchable={false}
                        searchablePlaceholder="Search authors"
                        showMore={false}
                    />
                </Box>
                <Box
                    sx={{
                        mt: '20px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        w: '100%',
                    }}
                >
                    <Hits
                        style={{
                            width: '100%',
                        }}
                        hitComponent={Hit}
                    />
                </Box>
            </InstantSearch>
        </PageContent>
    );
}

Blog.Layout = Layout;
