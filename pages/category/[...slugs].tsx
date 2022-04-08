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

import { getCategory } from "@lib/ecommerce/api";
import { createUserContext } from '@lib/user/UserContext';
import { Product, qc } from '@amplience/dc-demostore-integration';
import { nanoid } from 'nanoid'
import { useContent } from '@components/core/WithVisualization';
import styles from '../../components/ui/category-styles'
import DEFAULT_FACETS from '@lib/util/default-search-facets'

type CategoryPageConfig = {
    facets?: {
        type: string,
        field: string,
        title: string
    }[]
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { slugs } = context.params || {};
    const { vse } = context.query || {};

    // migrate from CT-specific 'key' to 'slug'
    let slug = _.last(slugs)

    const data = await fetchStandardPageData({
        content: {
            page: { key: `category/${slug}` }
        }
    }, context);

    let cmsContext = await createCmsContext(context.req)
    let userContext = await createUserContext(context)
    let category = await getCategory(qc({ args: { slug, full: true, productLimit: 12, includeProducts: true }, ...cmsContext, ...userContext }))

    if (!data.page || slug === 'favicon.ico') {
        return create404Error(data, context);
    }

    let results: Product[] = category.products || []

    const slots = await fetchPageData({
        content: {
            slots: (data.content.page?.slots || []).map((x: any) => ({ id: x.id }))
        }
    }, context)

    return {
        props: {
            ...data,
            vse: vse || "",
            category: JSON.parse(JSON.stringify(category)),
            results: JSON.parse(JSON.stringify(results)),
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
        results,
        slots
    } = props;

    const [config] = useContent(content.configComponents, vse);

    let facets: any[] = config?.categoryPage?.facets ?? DEFAULT_FACETS
    let components: CmsContent[] = props.content?.page?.components || []
    let pageSlots: CmsContent[] = slots
    let products: Product[] = results

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
