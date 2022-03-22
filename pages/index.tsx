import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import { CmsContent } from '@lib/cms/CmsContent';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import fetchPageData from "@lib/page/fetchPageData";
import ContentBlock from '@components/cms-modern/ContentBlock/ContentBlock';
import _ from 'lodash';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData({
    content: {
      page: { key: 'homepage' }
    }
  }, context);


const slots = await fetchPageData(
    {
        content:{
            slots: (data.content.page.slots || []).map((x: any) => ({id:x.id}))
        }
    }
, context)

  return {
    props: {
      ...data,
      slots:slots.content.slots
    }
  };
}

export default function Home({
  slots
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="af-main-content">
      {
        _.compact(slots).map(slot => <ContentBlock content={slot as CmsContent} type="SLOT" key={slot._meta.deliveryId} />)
      }
    </div>
  )
}

Home.Layout = Layout;