import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useContentAnalytics } from '@lib/analytics';
import { useCmsContext } from '@lib/cms/CmsContext';
import { commerceApi } from '@pages/api';
import { LegacySlider, LegacySliderSlide, Section } from '@components/ui';
import CuratedProductGridCard from './CuratedProductGridCard';
import { useUserContext } from '@lib/user/UserContext';
import each from 'lodash/each';
import find from 'lodash/find';
import { CommerceAPI, Product } from '@amplience/dc-integration-middleware';

interface Props {
    header: string;
    products: any[];
    navigationDots?: any;
}

const CuratedProductGrid = ({ header, products = [], navigationDots, ...other }: Props) => {
    // Retrieve locale/country code from context - TODO: get language from user context
    const { locale: cmsLocale } = useCmsContext() || {};
    let locale = cmsLocale || 'en';
    if (locale.indexOf('-') > 0) {
        locale = locale.split('-')[0];
    }

    const { trackEvent } = useContentAnalytics();

    const [productList, setProductList] = useState<Product[]>([]);

    const cmsContext = useCmsContext();
    const userContext = useUserContext();

    useEffect(() => {
        let isMounted: boolean = true;
        if (products && products?.length) {
            (commerceApi as CommerceAPI)
                .getProducts({ productIds: products.join(','), ...cmsContext, ...userContext })
                .then((prods: Product[]) => {
                    if (isMounted) {
                        // reorder based on the original ordering because these are not ordered
                        let orderedProducts: Product[] = [];
                        each(products, (product) => {
                            let ordered: any = find(prods, (prod) => prod?.id === product);
                            if (ordered) {
                                orderedProducts.push(ordered);
                            }
                        });
                        setProductList(orderedProducts);
                    }
                });
        }
        return () => {
            isMounted = false;
        };
    }, [products, cmsContext, userContext]);

    return (
        <div {...other}>
            <Section title={header}>
                <LegacySlider>
                    {productList.map((result: any, index: number) => {
                        return (
                            <LegacySliderSlide
                                key={index}
                                className={clsx({
                                    ['amp-length-2']: productList.length < 3,
                                    ['amp-length-3']: productList.length >= 3,
                                })}
                            >
                                <CuratedProductGridCard data={result} />
                            </LegacySliderSlide>
                        );
                    })}
                </LegacySlider>
            </Section>
        </div>
    );
};

export default CuratedProductGrid;
