import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import create404Error from '@lib/page/errors/create404Error';
import fetchContent, { GetByFilterRequest } from '@lib/cms/fetchContent';
import { createCmsContext, useCmsContext } from '@lib/cms/CmsContext';
import React, { useEffect, useState } from 'react';
import { Layout } from '@components/core';
import { Checkbox, FormControl, Grid, MenuItem, Paper, Select, SelectChangeEvent, Typography } from '@mui/material';
import StoreCard from '@components/cms-modern/Store/StoreCard';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cmsContext = await createCmsContext(context.req);

    const filterRequest: GetByFilterRequest = {
        filterBy: [
            {
                path: '/_meta/schema',
                value: 'https://demostore.amplience.com/content/store',
            },
        ],
        sortBy: {
            key: 'default',
            order: 'asc',
        },
    };

    const data = await fetchStandardPageData({ content: {} }, context);
    const storesData = await fetchContent([filterRequest], cmsContext);

    if (!storesData[0]) {
        return create404Error(storesData, context);
    }

    return {
        props: {
            ...data,
            storesData: storesData[0],
        },
    };
}

export default function StoreMainPage({ storesData, content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [parkingChecked, setParkingChecked] = React.useState(false);
    const [storesList, setStoresList] = React.useState(storesData as any);

    const handleChange = (event: SelectChangeEvent, value: unknown) => {
        setSortOrder(event.target.value as 'asc' | 'desc');
    };

    const handleParkingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setParkingChecked(event.target.checked);
    };

    const cmsContext = useCmsContext();

    useEffect(() => {
        let filterRequest: GetByFilterRequest = {
            filterBy: [
                {
                    path: '/_meta/schema',
                    value: 'https://demostore.amplience.com/content/store',
                },
            ],
            sortBy: {
                key: 'default',
                order: sortOrder,
            },
        };

        if (parkingChecked) {
            filterRequest.filterBy.push({ path: '/keyElements/parking', value: true });
        }

        fetchContent([filterRequest], cmsContext).then((result) => setStoresList(result[0]));
    }, [sortOrder, parkingChecked, cmsContext]);

    return (
        <div className="af-main-content" style={{ paddingBottom: 60 }}>
            <Typography style={{ marginTop: 30, marginBottom: 20 }} variant="h2" component="h2">
                Our Stores
            </Typography>
            <Paper
                variant="outlined"
                style={{ backgroundColor: '#efefef', marginLeft: 10, marginRight: 10, marginBottom: 30 }}
            >
                <FormControl variant="standard" style={{ width: '100%', padding: 20 }}>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={0}>
                        <Grid item xs={12} sm={4} md={3}>
                            <span style={{ paddingRight: 15 }}>Sort by:</span>
                            <Select value={sortOrder} onChange={handleChange}>
                                <MenuItem value="asc">name ascending</MenuItem>
                                <MenuItem value="desc">name descending</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <Checkbox color="primary" checked={parkingChecked} onChange={handleParkingChange} />
                            <Typography variant="body1" component="span">
                                Parking space
                            </Typography>
                        </Grid>
                    </Grid>
                </FormControl>
            </Paper>
            <Grid container style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', margin: 0, padding: 0 }}>
                {storesList.responses.map((store: any) => (
                    <StoreCard key={store.content._meta?.deliveryId} content={store.content} />
                ))}
            </Grid>
        </div>
    );
}

StoreMainPage.Layout = Layout;
