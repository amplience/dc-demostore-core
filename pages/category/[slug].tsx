import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import { CmsContent } from '@lib/cms/CmsContent';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { ContentBlock } from '@components/cms-modern';
import React from 'react';
import { PageContent, Breadcrumb } from '@components/ui';
import { ProductCard, ProductGrid, ProductFacet } from '@components/product';
import { Typography } from '@mui/material';
import create404Error from '@lib/page/errors/create404Error';
import withConfig from '@components/core/Config/withConfig';
import { createCmsContext } from '@lib/cms/CmsContext';
import fetchPageData from "@lib/page/fetchPageData";
import _ from 'lodash'
import { withStyles, WithStyles } from '@mui/styles';

import { getCommerceAPI } from '@pages/api';
import { createUserContext } from '@lib/user/UserContext';
import { Product } from '@amplience/dc-demostore-integration';
import { nanoid } from 'nanoid'
import { useContent } from '@components/core/WithVisualization';
import styles from '../../components/ui/category-styles'
import DEFAULT_FACETS from '@lib/util/default-search-facets'
import { mapToID } from '@lib/util';
import { configLocator } from '@lib/config/AppContext';

type CategoryPageConfig = {
    facets?: {
        type: string,
        field: string,
        title: string
    }[]
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let { slug } = context.params || {};
    const { vse } = context.query || {};

    const data = await fetchStandardPageData({
        content: {
            page: { key: `category/${slug}` }
        }
    }, context);

    if (!data.page || !slug || slug === 'favicon.ico') {
        return create404Error(data, context);
    }

    slug = Array.isArray(slug) ? slug.join('/') : slug
    const category = await (await getCommerceAPI({ config_locator: configLocator })).getCategory({ slug, ...await createCmsContext(context.req), ...await createUserContext(context) })

    const slots = await fetchPageData({
        content: {
            slots: (data.content.page?.slots || []).map(mapToID)
        }
    }, context)

    return {
        props: {
            ...data,
            vse: vse || "",
            category: JSON.parse(JSON.stringify(category)),
            slots: slots.content.slots
        }
    }
}

function CategoryPage(props: InferGetServerSidePropsType<typeof getServerSideProps> & WithStyles<typeof styles> & CategoryPageConfig) {
    const {
        vse,
        classes,
        content,
        category,
        slots
    } = props;

    const [config] = useContent(content.configComponents, vse);

    let facets: any[] = config?.categoryPage?.facets ?? DEFAULT_FACETS
    let components: CmsContent[] = props.content?.page?.components || []
    let pageSlots: CmsContent[] = slots
    let products: Product[] = category.products

    return (<>
        <PageContent>
            { /* NOVADEV-15: Breadcrumb category updates before large category on PLP */}
            {<div>
                <Breadcrumb className={classes.breadcrumb} />
                <div className={classes.header}>
                    <Typography variant="h2">{category && category.name}</Typography>
                </div>
            </div>}

            {/* Additional Components */}
            <div className={classes.topComponents}>
                {_.compact(components).map(content => <ContentBlock key={nanoid()} content={content} />)}

                {/* Slots and Content */}
                <div className="af-main-content">
                    {_.compact(pageSlots).map(slot => <ContentBlock key={nanoid()} content={slot} type="SLOT" />)}
                </div>
            </div>
            {!props.content?.page?.hideProductList &&
                <div className={classes.container}>
                    <div className={classes.facets}>
                        {facets.map(facet => <ProductFacet key={nanoid()} title={facet.title} />)}
                    </div>
                    <div className={classes.results}>
                        <ProductGrid>
                            {products.map(product => <ProductCard key={nanoid()} data={product} />)}
                        </ProductGrid>
                    </div>
                </div>
            }
        </PageContent>
    </>)
};


const component = withConfig('categoryPage')(withStyles(styles)(CategoryPage));
(component as any).Layout = Layout;

export default component;
