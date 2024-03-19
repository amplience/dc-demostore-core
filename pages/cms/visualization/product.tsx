import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { content: contentId } = context.query;

    const { res } = context;

    const data = await fetchStandardPageData(
        {
            content: {
                content: { id: contentId as string },
            },
        },
        context
    );

    const dk = data?.content?.content?._meta.deliveryKey;
    const sku = dk.split('product/')[1];

    if (res) {
        const queryArgs = [];
        for (let key of Object.keys(context.query)) {
            queryArgs.push([key, context.query[key]]);
        }

        res.setHeader('Cache-Control', 'no-cache ');
        res.writeHead(301, {
            Location:
                `/product/${sku}?` +
                queryArgs.map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`).join('&'),
        });
        res.end();
    }

    return {
        props: {},
    };
}

export default function Home({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <>hello world</>;
}

Home.Layout = Layout;
