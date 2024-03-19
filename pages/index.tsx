import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import { CmsContent } from '@lib/cms/CmsContent';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import fetchPageData from '@lib/page/fetchPageData';
import ContentBlock from '@components/cms-modern/ContentBlock/ContentBlock';
import _ from 'lodash';
import { mapToID } from '@lib/util';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const data = await fetchStandardPageData(
        {
            content: {
                page: { key: 'homepage' },
            },
        },
        context
    );

    const slots = await fetchPageData(
        {
            content: {
                slots: data?.content?.page?.slots.map(mapToID),
            },
        },
        context
    );

    return {
        props: {
            ...data,
            slots: slots.content.slots,
        },
    };
}

export default function Home({ slots }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="af-main-content">
            {_.compact(slots).map((slot) => (
                <ContentBlock content={slot} type="SLOT" key={slot?._meta.deliveryId} />
            ))}
        </div>
    );
}

Home.Layout = Layout;
