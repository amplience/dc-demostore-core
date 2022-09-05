import fetchStandardPageData from "@lib/page/fetchStandardPageData";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import create404Error from '@lib/page/errors/create404Error';
import fetchContent from "@lib/cms/fetchContent";
import { createCmsContext } from "@lib/cms/CmsContext";
import React from "react";
import { Store } from "@components/cms-modern";
import { ContentBlock } from "@components/cms-modern";
import { Layout } from "@components/core";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cmsContext = await createCmsContext(context.req);
  
  const {
    slug = []
  } = context.params || {};

  const [id] = slug;

  const [data] = await Promise.all(
    [
      fetchStandardPageData(
        {
          content: {
            store: {key: "store/" + id },
          },
        },
        context
      )
    ]
  );

  if (!data.content.store) {
    return create404Error(data, context);
  }

  return {
    props: {
      ...data
      }
    }
  }

export default function StorePage(
  {storeContent, content}
: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <div className="af-main-content">
      <ContentBlock content={content.store}></ContentBlock>
    </div>
  );
}

StorePage.Layout = Layout;
