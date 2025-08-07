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
import cloneDeep from 'lodash/cloneDeep';
import compact from 'lodash/compact';
import { commerceApi } from '@pages/api';
import { createUserContext } from '@lib/user/UserContext';
import { Category, Product } from '@amplience/dc-integration-middleware';
import { useContent } from '@components/core/WithVisualization';
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
        context,
    );

    if (!data.page || !slug || slug === 'favicon.ico') {
        return create404Error(data, context);
    }

    if (data.content.page && !data.content.page.active) {
        data.content.page = null;
    }

    slug = Array.isArray(slug) ? slug.join('/') : slug;
    const props = await fetchPageData(
        {
            content: {
                slots: (data.content.page?.slots || []).map(mapToID),
            },
        },
        context,
    );

    let category;
    if (data.content.page?.categoryId) {
        category = findCategory(props.ecommerce.categories, (cat) => cat.id === data.content.page?.categoryId);
    } else {
        category = findCategory(props.ecommerce.categories, (cat) => cat.slug === slug);
    }

    if (!category) {
        return create404Error(data, context);
    }

    category = cloneDeep(category);
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

    let components: CmsContent[] = props.content?.page?.components || [];
    let pageSlots: CmsContent[] = slots;
    let products: Product[] = category?.products;

    return (
        <>
            <PageContent>
                {
                    <div>
                        <Breadcrumb />
                        <div style={{ marginBottom: '30px' }}>
                            <Typography variant="h2">{category && category.categoryId}</Typography>
                        </div>
                    </div>
                }

                {/* Additional Components */}
                <div>
                    {compact(components).map((content, index: number) => (
                        <ContentBlock key={index} content={content} />
                    ))}

                    {/* Slots and Content */}
                    <div className="af-main-content">
                        {compact(pageSlots).map((slot, index: number) => (
                            <ContentBlock key={index} content={slot} type="SLOT" />
                        ))}
                    </div>
                </div>
                {!props.content?.page?.hideProductList && (
                    <div>
                        <div>
                            <ProductGrid>
                                {products?.map((product, index: number) => <ProductCard key={index} data={product} />)}
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
