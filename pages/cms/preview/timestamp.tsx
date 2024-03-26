import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
const Cookies = require('cookies');

import { StagingEnvironmentFactory } from 'dc-delivery-sdk-js';
import { createAppContext } from '@lib/config/AppContext';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { res, req, query } = context;
    let { vse, hub, timestamp, isoTimestamp, redirect = '/' } = query || {};

    if (isoTimestamp) {
        timestamp = `${new Date(isoTimestamp as string).getTime()}`;
    }

    let { cms } = await createAppContext();
    if (timestamp && !vse && !isNaN(Number(timestamp))) {
        // generate vse
        const factory = new StagingEnvironmentFactory(cms.stagingApi as string);
        if (timestamp && cms.stagingApi) {
            const stagingEnvironmentAtTimestamp = await factory.generateDomain({
                timestamp: Number(timestamp),
            });
            vse = stagingEnvironmentAtTimestamp;
        }
    }

    if (res) {
        const cookies = new Cookies(req, res);
        cookies.set('amplience-host', vse);
        if (hub) {
            cookies.set('hub', hub);
        } else {
            cookies.set('hub');
        }
        if (timestamp) {
            cookies.set('timestamp', timestamp);
        } else {
            cookies.set('timestamp');
        }

        res.setHeader('Cache-Control', 'no-cache ');
        res.writeHead(301, {
            Location: redirect,
        });
        res.end();
    }

    return {
        props: {},
    };
}

export default function Timestamp({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div></div>;
}
