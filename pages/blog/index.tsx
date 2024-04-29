import { GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import { useCmsContext } from '@lib/cms/CmsContext';
import React from 'react';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { Breadcrumb, PageContent } from '@components/ui';
import { Grid, Typography, styled } from '@mui/material';
import { NavigationItem } from '@components/core/Masthead';
import { useAppContext } from '@lib/config/AppContext';
import { useAcceleratedMedia } from '@components/admin/AdminPanel/context/AcceleratedMediaContext';
import { ImageFormat } from '@utils/getImageURL';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, SearchBox, RefinementList, Pagination, Configure } from 'react-instantsearch';
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

export default function BlogPage() {
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
    if (acceleratedMedia) {
        format = ImageFormat.AVIF;
    }

    if (!algolia) {
        return;
    }
    const searchClient = algoliasearch(algolia.appId, algolia.apiKey);
    let hub = cms.hub;
    let indexName = stagingApi ? `${hub}.blog-staging` : `${hub}.blog-production`;

    const StyledPagination = styled('div')({
        marginBottom: 10,
        '& .ais-Pagination-item': {
            marginLeft: 3,
            margingRight: 3,
        },
        '& .ais-Pagination-item--page ': {
            color: 'black',
            border: '1px solid black',
            width: 25,
            height: 25,
            backgroundColor: 'white',
            '& .ais-Pagination-link': {
                textAlign: 'center',
                width: '100%',
                display: 'inline-block',
            },
        },
        '& .ais-Pagination-item--selected': {
            color: 'white',
            backgroundColor: 'black',
        },
        '& .ais-Pagination-item--disabled': {
            display: 'none',
        },
    });

    function Hit(props: any) {
        return (
            <Grid
                item
                key={props.hit._meta?.deliveryId}
                xs={12}
                sm={12}
                md={6}
                lg={4}
                height={{ xs: 550, sm: 550, md: 500, lg: 450 }}
                style={{
                    float: 'inline-start',
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingBottom: 10,
                }}
            >
                <DynamicBlogListCard key={props.hit._meta?.deliveryId} data={props.hit} />
            </Grid>
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
                <Configure hitsPerPage={9} />
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        w: '100%',
                    }}
                    columns={6}
                    spacing={2}
                >
                    <Grid item xs={6} sm={2} md={1} lg={1}>
                        <SearchBox style={{ marginBottom: 20, width: '100%' }} />
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
                    </Grid>
                    <Grid
                        item
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            margin: 0,
                            padding: 0,
                            w: '100%',
                        }}
                        xs={6}
                        sm={4}
                        md={5}
                        lg={5}
                    >
                        <Grid
                            container
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                margin: 0,
                                padding: 0,
                                w: '100%',
                            }}
                            columns={12}
                            spacing={2}
                        >
                            <Hits
                                style={{
                                    width: '100%',
                                }}
                                hitComponent={Hit}
                            />
                        </Grid>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item>
                                <StyledPagination>
                                    <Pagination padding={30} />
                                </StyledPagination>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </InstantSearch>
        </PageContent>
    );
}

BlogPage.Layout = Layout;
