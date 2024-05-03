import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchContent, { GetByFilterRequest, SortByOrder } from '@lib/cms/fetchContent';
import { CmsContext, createCmsContext, useCmsContext } from '@lib/cms/CmsContext';
import React, { useEffect } from 'react';
import { Layout } from '@components/core';
import { FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent, Typography } from '@mui/material';
import DynamicBlogListCard from '@components/cms-modern/DynamicBlogList/DynamicBlogListCard';
import { useState } from 'react';

async function fetchBlogs(context: CmsContext, options: { key?: string; order?: SortByOrder }) {
    const { key = 'default', order = 'desc' } = options;
    const fetchPage = async (nextCursor?: string): Promise<any> => {
        const filterRequest: GetByFilterRequest = {
            filterBy: [
                {
                    path: '/_meta/schema',
                    value: 'https://demostore.amplience.com/content/blog',
                },
            ],
            sortBy: {
                key,
                order: order as SortByOrder,
            },
            page: {
                size: 12,
                cursor: nextCursor,
            },
        };
        const results = (await fetchContent([filterRequest], context))[0];
        const responses = results?.responses || [];

        if (results?.page.nextCursor) {
            return [...responses, ...(await fetchPage(results?.page.nextCursor))];
        }
        return responses;
    };

    return fetchPage();
}

export type SortByValue = 'default' | 'title' | 'author';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cmsContext = await createCmsContext(context.req);
    const data = await fetchStandardPageData({ content: {} }, context);
    const blogs = (await fetchBlogs(cmsContext, {})) || [];

    return {
        props: {
            ...data,
            blogs,
        },
    };
}

export default function BlogFilterPage({ blogs }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [blogList, setBlogList] = useState(blogs as any);
    const [sortOrder, setSortOrder] = useState<SortByOrder>('desc');
    const [sortValue, setSortValue] = useState<SortByValue>('default');

    const cmsContext = useCmsContext();

    const handleSortValueChange = (event: SelectChangeEvent) => {
        setSortValue(event.target.value as SortByValue);
    };

    const handleSortOrderChange = (event: SelectChangeEvent) => {
        setSortOrder(event.target.value as SortByOrder);
    };

    useEffect(() => {
        async function fetchData() {
            const blogs = await fetchBlogs(cmsContext, { order: sortOrder, key: sortValue });
            setBlogList(blogs);
        }
        fetchData();
    }, [cmsContext, sortOrder, sortValue]);

    return (
        <div className="af-main-content" style={{ paddingBottom: 60 }}>
            <Typography style={{ marginTop: 30, marginBottom: 20, marginLeft: 20 }} variant="h2" component="h2">
                Our Blogs
            </Typography>
            <Paper
                variant="outlined"
                style={{ backgroundColor: '#efefef', marginLeft: 10, marginRight: 10, marginBottom: 30 }}
            >
                <FormControl variant="standard" style={{ width: '100%', padding: 0 }}>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={0}>
                        <Grid item xs={12} sm={4} md={3}>
                            <FormControl variant="standard" style={{ width: '100%', padding: 20 }}>
                                <span style={{ paddingRight: 15 }}>Sort by:</span>
                                <Select id="sortBy" name="sortBy" value={sortValue} onChange={handleSortValueChange}>
                                    <MenuItem value="default">Date</MenuItem>
                                    <MenuItem value="title">Title</MenuItem>
                                    <MenuItem value="author">Author</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <FormControl variant="standard" style={{ width: '100%', padding: 20 }}>
                                <span style={{ paddingRight: 15 }}>Sort order:</span>
                                <Select
                                    id="sortOrder"
                                    name="sortOrder"
                                    value={sortOrder}
                                    onChange={handleSortOrderChange}
                                >
                                    <MenuItem value="asc">Ascending</MenuItem>
                                    <MenuItem value="desc">Descending</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </FormControl>
            </Paper>
            <Grid
                container
                style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', margin: 0, padding: 0 }}
                columns={12}
                spacing={2}
            >
                {blogList?.map((blog: any) => (
                    <Grid item key={blog.content._meta?.deliveryId} xs={12} md={6} lg={4}>
                        <DynamicBlogListCard key={blog.content._meta?.deliveryId} data={blog.content} />
                    </Grid>
                ))}
                {!blogList.length && (
                    <Typography
                        style={{ marginTop: 30, marginBottom: 20, marginLeft: 20 }}
                        variant="body1"
                        component="body"
                    >
                        No Blogs posts available at this time
                    </Typography>
                )}
            </Grid>
        </div>
    );
}

BlogFilterPage.Layout = Layout;
