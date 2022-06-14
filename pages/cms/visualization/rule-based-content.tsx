import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import { ContentBlock } from '@components/cms-modern';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { InstantSearch, Hits, RefinementList } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import Head from 'next/head';

import { useCmsContext } from '@lib/cms/CmsContext';
import WithLazyContent from '@components/cms-modern/WithLazyContent';
import { useAppContext } from '@lib/config/AppContext';

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

const { algolia, cms } = useAppContext();
const searchClient = algoliasearch(algolia.appId, algolia.apiKey);

export default function RuleBasedContentVisualization({
  content
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const Hit = ({hit}: any) => {
        return <div style={{width: '100%'}}>
            <WithLazyContent request={{id: hit.content.id}}>
                {
                    ({content}: any) => {
                        return <ContentBlock content={content} />
                    }
                }
            </WithLazyContent>
        </div>;
    }

  return (
    <div>
        <Head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css" integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8=" crossOrigin="anonymous" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossOrigin="anonymous" />
        </Head>
        <InstantSearch indexName={`${cms.hub}.rule-based-staging`} 
                        searchClient={searchClient}>
            <RefinementList attribute="rules.pageTypes" />
            <Hits hitComponent={Hit} />
        </InstantSearch>
    </div>
  )
}

RuleBasedContentVisualization.Layout = Layout;