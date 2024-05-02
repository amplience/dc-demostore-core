import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { ContentBlock } from '@components/cms-modern';
import create404Error from '@lib/page/errors/create404Error';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { slug } = context.params || {};
    const deliveryKey = Array.isArray(slug) ? slug.join('/') : (slug as string);

    const data = await fetchStandardPageData(
        {
            content: {
                page: { key: `content/${deliveryKey}` },
            },
        },
        context,
    );

    if (!data.page) {
        return create404Error(data, context);
    }

    return {
        props: {
            ...data,
        },
    };
}

export default function ContentPage({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <ContentBlock content={content.page} />;
}

ContentPage.Layout = Layout;
