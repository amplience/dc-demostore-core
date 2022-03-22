import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { StandaloneLayout } from '@components/core';
import { ContentBlock } from '@components/cms-modern';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    content: contentId
  } = context.query;
  
  const data = await fetchStandardPageData({
    content: {
      content: { id: contentId as string }
    }
  }, context);

  return {
    props: {
      ...data
    }
  };
}

export default function Home({
  content
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
      <ContentBlock content={content.content} />
  )
}

Home.Layout = StandaloneLayout;