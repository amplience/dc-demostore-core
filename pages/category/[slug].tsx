import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import { CmsContent } from '@lib/cms/CmsContent';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { CardEnhanced, ContentBlock } from '@components/cms-modern';
import React from 'react';
import { PageContent, Breadcrumb } from '@components/ui';
import { ProductCard, ProductGrid, ProductFacet } from '@components/product';
import { Grid, Typography } from '@mui/material';
import create404Error from '@lib/page/errors/create404Error';
import withConfig from '@components/core/Config/withConfig';
import { createCmsContext } from '@lib/cms/CmsContext';
import fetchPageData from "@lib/page/fetchPageData";
import _ from 'lodash'
import { withStyles, WithStyles } from '@mui/styles';

import { commerceApi } from '@pages/api';
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
    const category = await commerceApi.getCategory({ slug, ...await createCmsContext(context.req), ...await createUserContext(context) })

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
        title,
        classes,
        content,
        category,
        slots,
    } = props;

    const [config] = useContent(content.configComponents, vse);

    let facets: any[] = config?.categoryPage?.facets ?? DEFAULT_FACETS
    let components: CmsContent[] = props.content?.page?.components || []
    let pageSlots: CmsContent[] = slots
    let gridSlots: CmsContent[] = props.content?.page?.gridslots || []
    let products: Product[] = category.products

    return (<>
        <PageContent>
            { /* NOVADEV-15: Breadcrumb category updates before large category on PLP */}
            {<div>
                <Breadcrumb className={classes.breadcrumb} />
                <div className={classes.header}>
                    <Typography variant="h2">{title || ( category && category.name ) }</Typography>
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
            {
                !props.content?.page?.hideProductList &&
                <div className={classes.container}>
                    <div className={classes.facets}>
                        {facets.map(facet => <ProductFacet key={nanoid()} title={facet.title} />)}
                    </div>
                    <div className={classes.results}>
                        <ProductGrid>
                            {
                                products.map((product: any, idx: number) => {

                                    // Insert Amplience Grid Content
                                    if (gridSlots.length) {

                                        const card = gridSlots.find(obj => { return obj.position === idx });

                                        if (card != undefined && card.card != undefined) {
                                            const { img } = card.card.image || {};

                                            const ratio = (card.cols === card.rows) ? '1:1' : card.cols + ':' + card.rows;

                                            const cardtransformations = {
                                                ...img?.image,
                                                upscale: true,
                                                strip: true,
                                                quality: 80,
                                                width: (400 * card.cols),
                                                height: 400 * card.rows,
                                                aspectRatio: ratio,
                                                scaleMode: 'c',
                                                scaleFit: !card.card.image?.disablePoiAspectRatio
                                                    && img?.image?.poi
                                                    && img?.image?.poi.x != -1
                                                    && img?.image?.poi.y != -1
                                                    ? 'poi'
                                                    : undefined,
                                            }

                                            let gridItemStyle = {
                                                gridColumnEnd: `span ${card.cols}`,
                                                gridRowEnd: `span ${card.rows}`
                                            };
                                        
                                            var itemCSS = gridItemStyle as React.CSSProperties ;

                                            //console.log('card ' + idx, cardtransformations)

                                            return (
                                                <div key={nanoid()} style={itemCSS}>
                                                    <CardEnhanced {...card.card} index={idx} transformations={cardtransformations} />
                                                </div>
                                            )
                                        }
                                    }
                                
                                    return <ProductCard key={nanoid()} data={product} />}
                                )
                            }
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
