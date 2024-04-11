import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchContent, { GetByFilterRequest } from '@lib/cms/fetchContent';
import { CmsContext, createCmsContext, useCmsContext } from '@lib/cms/CmsContext';
import React, { useEffect } from 'react';
import { Layout } from '@components/core';
import { FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent, Typography } from '@mui/material';
import DynamicBlogListCard from '@components/cms-modern/DynamicBlogList/DynamicBlogListCard';
import { useState } from 'react';



async function getAllBlogs(context:CmsContext, next_cursor = null, order = 'desc', value = 'default', blogs = []) {
    const blogData = [...blogs];

    const filterRequest: GetByFilterRequest = {
        filterBy: [
            {
                path: '/_meta/schema',
                value: 'https://demostore.amplience.com/content/blog',
            },
            {
                path: '/active',
                value: true
            }
        ],
        sortBy: {
            key: 'default',
            order: 'asc'
        },
        page: {
            size: 12
        }
    };

    if(next_cursor && filterRequest.page) filterRequest.page.cursor = next_cursor;
    if(filterRequest.sortBy){
        filterRequest.sortBy.key = value;
        filterRequest.sortBy.order = order as 'asc' | 'desc' | undefined;
    }

    const fetched = await fetchContent([filterRequest], context);
    if (fetched && fetched[0]){
        const res = fetched[0];
        const res2:[] = res.responses
        res2.forEach(function(blog){
            blogData.push(blog)
        })
        if( res.page.nextCursor){
            return await getAllBlogs(context, res.page.nextCursor, order, value, blogData)
        }
    }
    return blogData
}



export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cmsContext = await createCmsContext(context.req);
    const data = await fetchStandardPageData({ content: {} }, context);
    const blogData = await getAllBlogs(cmsContext) || [];

    return {
        props: {
            ...data,
            blogData: blogData,
        },
    };
}

export default function BlogFilterPage({ blogData, content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [blogList, setBlogList] = React.useState(blogData as any);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortValue, setSortValue] = useState<'default' | 'title' | 'author'>('default');

    const cmsContext = useCmsContext();

    const handleChange = (event: SelectChangeEvent, value: unknown) => {
        if (event.target.name == 'sortBy'){
            setSortValue(event.target.value as 'default' | 'title' | 'author')
        }
        if (event.target.name == 'sortOrder'){
            setSortOrder(event.target.value as 'asc' | 'desc');
        }
    };

    useEffect(() => {
        async function fetchData() {
            const newBlogs = await getAllBlogs(cmsContext, null, sortOrder, sortValue);
            setBlogList(newBlogs)
        }
        fetchData()
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
                                <Select id='sortBy' name='sortBy' value={sortValue} onChange={handleChange}>
                                    <MenuItem value="default">Date</MenuItem>
                                    <MenuItem value="title">Title</MenuItem>
                                    <MenuItem value="author">Author</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <FormControl variant="standard" style={{ width: '100%', padding: 20 }}>
                                <span style={{ paddingRight: 15 }}>Sort order:</span>
                                <Select id='sortOrder' name='sortOrder' value={sortOrder} onChange={handleChange}>
                                    <MenuItem value="asc">Ascending</MenuItem>
                                    <MenuItem value="desc">Descending</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </FormControl>
            </Paper>
            <Grid container style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', margin: 0, padding: 0 }} columns={12} spacing={2}>
                {blogList?.map((blog: any) => (
                    <Grid item key={blog.content._meta?.deliveryId} xs={12} md={6} lg={4}>
                        <DynamicBlogListCard key={blog.content._meta?.deliveryId} data={blog.content}/>
                    </Grid>
                ))}
                {!blogList.length &&
                    <Typography style={{ marginTop: 30, marginBottom: 20, marginLeft: 20 }} variant="body1" component="body">
                        No Blogs posts available at this time
                    </Typography>
                }
            </Grid>
        </div>
    );
}

BlogFilterPage.Layout = Layout;
