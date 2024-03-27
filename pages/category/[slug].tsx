import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { Layout } from '@components/core';
import { CmsContent } from '@lib/cms/CmsContent';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { ContentBlock } from '@components/cms-modern';
import React from 'react';
import { PageContent, Breadcrumb } from '@components/ui';
import { ProductCard, ProductGrid } from '@components/product';
import { Typography } from '@mui/material';
import create404Error from '@lib/page/errors/create404Error';
import withConfig from '@components/core/Config/withConfig';
import { createCmsContext } from '@lib/cms/CmsContext';
import fetchPageData from '@lib/page/fetchPageData';
import _ from 'lodash';

import { commerceApi } from '@pages/api';
import { createUserContext } from '@lib/user/UserContext';
import { Category, Product } from '@amplience/dc-integration-middleware';
import { nanoid } from 'nanoid';
import { useContent } from '@components/core/WithVisualization';
import DEFAULT_FACETS from '@lib/util/default-search-facets';
import { clearUndefined, mapToID } from '@lib/util';

type CategoryPageConfig = {
    facets?: {
        type: string;
        field: string;
        title: string;
    }[];
};

function findCategory(categories: Category[], predicate: (category: Category) => boolean): Category | null {
    for (const category of categories) {
        if (predicate(category)) {
            return category;
        }
        const child = findCategory(category.children, predicate);
        if (child) {
            return child;
        }
    }

    return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let { slug } = context.params || {};
    const { vse } = context.query || {};
    const data = await fetchStandardPageData(
        {
            content: {
                page: { key: `category/${slug}` },
            },
        },
        context
    );

    if (!data.page || !slug || slug === 'favicon.ico') {
        return create404Error(data, context);
    }

    if (data.content.page && !data.content.page.active) {
        // The cms content shouldn't be respected.
        data.content.page = null;
    }

    slug = Array.isArray(slug) ? slug.join('/') : slug;
    const props = await fetchPageData(
        {
            content: {
                slots: (data.content.page?.slots || []).map(mapToID),
            },
        },
        context
    );

    // use the content to get by ID if available in the content to control. Otherwise use the slug
    let category;
    if (data.content.page?.name) {
        const cmsslug = data.content.page?.name;
        category = findCategory(props.ecommerce.categories, (cat) => cat.id === cmsslug);
    } else {
        category = findCategory(props.ecommerce.categories, (cat) => cat.slug === slug);
    }

    if (!category) {
        return create404Error(data, context);
    }

    category = _.cloneDeep(category);
    const products = await commerceApi.getProducts({
        category,
        ...(await createCmsContext(context.req)),
        ...(await createUserContext(context)),
        pageSize: 30,
        pageCount: 1,
    });
    category.products = products;

    return {
        props: {
            ...data,
            vse: vse || '',
            category: clearUndefined(category),
            slots: props.content.slots,
        },
    };
}

function CategoryPage(props: InferGetServerSidePropsType<typeof getServerSideProps> & CategoryPageConfig) {
    const { vse, content, category, slots } = props;
    const [config] = useContent(content.configComponents, vse);

    // let facets: any[] = config?.categoryPage?.facets ?? DEFAULT_FACETS;
    let components: CmsContent[] = props.content?.page?.components || [];
    let pageSlots: CmsContent[] = slots;
    let products: Product[] = category?.products;

    return (
        <>
            <PageContent>
                {/* NOVADEV-15: Breadcrumb category updates before large category on PLP */}
                {
                    <div>
                        <Breadcrumb />
                        <div style={{ marginBottom: '30px' }}>
                            <Typography variant="h2">{category && category.name}</Typography>
                        </div>
                    </div>
                }

                {/* Additional Components */}
                <div>
                    {_.compact(components).map((content) => (
                        <ContentBlock key={nanoid()} content={content} />
                    ))}

                    {/* Slots and Content */}
                    <div className="af-main-content">
                        {_.compact(pageSlots).map((slot) => (
                            <ContentBlock key={nanoid()} content={slot} type="SLOT" />
                        ))}
                    </div>
                </div>
                {!props.content?.page?.hideProductList && (
                    <div>
                        {/* <div className={classes?.facets}>
                            {facets.map((facet) => (
                                <ProductFacet key={nanoid()} title={facet.title} />
                            ))}
                        </div> */}
                        <div>
                            <ProductGrid>
                                {products?.map((product) => (
                                    <ProductCard key={nanoid()} data={product} />
                                ))}
                            </ProductGrid>
                        </div>
                    </div>
                )}
            </PageContent>
        </>
    );
}

const component = withConfig('categoryPage')(CategoryPage);
(component as any).Layout = Layout;

export default component;
