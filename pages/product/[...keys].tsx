import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { Layout } from "@components/core";
import fetchStandardPageData from "@lib/page/fetchStandardPageData";
import create404Error from "@lib/page/errors/create404Error";
import { createCmsContext } from "@lib/cms/CmsContext";
import { useContent } from '@components/core/WithVisualization';
import { commerceApi } from '@pages/api';
import fetchContent, { CmsFilterResponse, GetByFilterRequest } from "@lib/cms/fetchContent";
import { CmsComponent } from "@components/cms-layout";
import WithProduct from "@components/product/WithProduct";
import { createUserContext } from '@lib/user/UserContext';
import _ from 'lodash'
import { nanoid } from 'nanoid'
import { clearUndefined } from "@lib/util";

function chooseExperienceConfig(filterResults: CmsFilterResponse[]): any | undefined {
  const configs = [];
  for (let filterResult of filterResults) {
    if (filterResult.responses && filterResult.responses.length > 0 && filterResult.responses[0].content) {
      configs.push(filterResult.responses[0].content);
    }
  }

  // TODO: remove any config that sits under a category that does not apply to this product
  configs.sort((a, b) => (b.priority || 999) - (a.priority || 999));
  return configs.pop();
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { keys } = context.params || {};
  const { vse } = context.query || {};

  let key = _.first(keys)

  const { pdpLayout } = context.query;
  const cmsContext = await createCmsContext(context.req);
  const userContext = await createUserContext(context)

  const data = await fetchStandardPageData({
    content: {
      defaultPDPLayout: pdpLayout ? { id: pdpLayout as string } : { key: 'layout/default-pdp' },
      productContent: { key: "product/" + key }
    },
  }, context)

  const product = clearUndefined(await commerceApi.getProduct({ id: key, ...cmsContext, ...userContext }))

  if (!product) {
    return create404Error(data, context);
  }

  if (data.content.productContent?.active) {
    // The cms content shouldn't be respected.
    data.content.productContent = null;
}

  const experienceConfigRequests: GetByFilterRequest[] = [];

  // config based on category
  product.categories.forEach((category: any) => {
    experienceConfigRequests.push(
      {
        filterBy: [
          {
            path: '/_meta/schema',
            value: 'https://demostore.amplience.com/site/experiences/category'
          },
          {
            path: '/id',
            value: category.id
          }
        ],
        sortBy: {
          key: 'default',
          order: 'desc'
        },
        page: {
          size: 1
        }
      }
    )
  });

  let designer = product?.variants?.[0]?.attributes['designer']

  // config based on designer
  if (designer) {
    experienceConfigRequests.push(
      {
        filterBy: [
          {
            path: '/_meta/schema',
            value: 'https://demostore.amplience.com/site/experiences/designer'
          },
          {
            path: '/designer',
            value: designer
          }
        ],
        sortBy: {
          key: 'default',
          order: 'desc'
        },
        page: {
          size: 1
        }
      }
    );
  }

  // config based on SKU
  experienceConfigRequests.push(
    {
      filterBy: [
        {
          path: '/_meta/schema',
          value: 'https://demostore.amplience.com/site/experiences/product'
        },
        {
          path: '/id',
          value: product.id
        }
      ],
      sortBy: {
        key: 'default',
        order: 'desc'
      },
      page: {
        size: 1
      }
    }
  );

  const experienceConfigs = await fetchContent(experienceConfigRequests, cmsContext);

  // take the most specific config
  const experienceConfig = chooseExperienceConfig(experienceConfigs as CmsFilterResponse[]) || {};

  return {
    props: {
      ...data,
      vse: vse || "",
      key,
      product,
      experienceConfig,
      forceDefaultLayout: pdpLayout != null
    },
  };
}

export default function ProductPage({
  vse,
  product,
  content,
  experienceConfig,
  forceDefaultLayout
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [layout] = useContent(experienceConfig?.experience?.pdpLayout && !forceDefaultLayout ? experienceConfig?.experience?.pdpLayout : content.defaultPDPLayout, vse);
  const [productContent] = useContent(content.productContent, vse);

  const compositeProduct = { ...product, ...productContent };

  return (
    <WithProduct product={compositeProduct}>
      <div style={{ flexGrow: 1 }}>
        {layout && ((layout.slots || {}).main || []).map((component: any) => <CmsComponent key={nanoid()} data={component} />)}
      </div>
    </WithProduct>
  );
}

ProductPage.Layout = Layout;