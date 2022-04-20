import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import { CmsContent } from '@lib/cms/CmsContent';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import fetchPageData from "@lib/page/fetchPageData";
import { ContentBlock } from '@components/cms-modern';
import create404Error from '@lib/page/errors/create404Error';
import { mapToID, notNull } from '@lib/util';
import { nanoid } from 'nanoid'

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { slug } = context.params || {};
    const deliveryKey = Array.isArray(slug) ? slug.join('/') : slug as string;

    const data = await fetchStandardPageData({
        content: {
            page: { key: `page/${deliveryKey}` }
        }
    }, context);

    if (!data.page) {
        return create404Error(data, context);
    }

    const slots = await fetchPageData({
        content: {
            slots: data.content.page?.slots.map(mapToID)
        }
    }, context)

    return {
        props: {
            ...data,
            slots: slots.content.slots
        }
    };
}

export default function LandingPage({ content, slots }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="af-main-content">
            {
                slots.filter(notNull).map((slot: CmsContent) => (<ContentBlock content={slot} type="SLOT" key={nanoid()} />))
            }
            {
                content?.page?.components.filter(notNull).map((content: CmsContent) => (<ContentBlock content={content} key={nanoid()} />))
            }
        </div>
    )
}

LandingPage.Layout = Layout;