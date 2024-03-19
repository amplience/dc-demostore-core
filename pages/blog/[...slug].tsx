import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import { CmsContent } from '@lib/cms/CmsContent';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { ContentBlock } from '@components/cms-modern';
import { nanoid } from 'nanoid';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { slug = [] } = context.params || {};

    const blogKey = Array.isArray(slug) ? slug.join('/') : slug;

    const data = await fetchStandardPageData(
        {
            content: {
                slots: [{ key: blogKey }],
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

export default function Blog({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="af-main-content">
            {content.slots
                .filter((slot) => slot != null)
                .map((slot) => {
                    return <ContentBlock key={nanoid()} content={slot as CmsContent} type="SLOT" />;
                })}
        </div>
    );
}

Blog.Layout = Layout;
