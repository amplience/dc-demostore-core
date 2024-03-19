import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import { ContentBlock } from '@components/cms-modern';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { PageContent } from '@components/ui';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { content: contentId } = context.query;

    const data = await fetchStandardPageData(
        {
            content: {
                content: { id: contentId as string },
            },
        },
        context
    );

    return {
        props: {
            ...data,
        },
    };
}

export default function Home({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <PageContent>
            <ContentBlock content={content.content} />
        </PageContent>
    );
}

Home.Layout = Layout;
