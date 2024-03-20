import React, { useEffect, useState } from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { useContentAnalytics } from '@lib/analytics';
import { useCmsContext } from '@lib/cms/CmsContext';

import { useUserContext } from '@lib/user/UserContext';
import { CommerceAPI, Product } from '@amplience/dc-integration-middleware';
import { commerceApi } from '@pages/api';
import { useECommerce } from '@components/core/Masthead/ECommerceContext';
import { getImageURL } from '@utils/getImageURL';
import Link from 'next/link';

type Props = {} & CmsContent;

const ProductGrid = ({ category, query, limit }: Props) => {
    const { trackEvent } = useContentAnalytics();

    const { categoriesById } = useECommerce();

    const [products, setProducts] = useState<Product[]>([]);

    const cmsContext = useCmsContext();
    const userContext = useUserContext();

    useEffect(() => {
        let isMounted: boolean = true;
        const c = categoriesById[category];
        if (c != null) {
            if (query != null && query.length > 0) {
                // Request filtered by query, then only get product matches.
                (commerceApi as CommerceAPI)
                    .getProducts({ keyword: query, ...cmsContext, ...userContext })
                    .then((products: Product[]) => {
                        if (isMounted && products) {
                            setProducts(
                                products.filter(
                                    (product) => product.categories.findIndex((cat) => cat.id === category) !== -1
                                )
                            );
                        }
                    });
            } else {
                // Request expected number of category products.

                (commerceApi as CommerceAPI)
                    .getProducts({ category: c, ...cmsContext, ...userContext, pageSize: limit, pageCount: 1 })
                    .then((products: Product[]) => {
                        if (isMounted && products) {
                            setProducts(products);
                        }
                    });
            }
        }
        return () => {
            isMounted = false;
        };
    }, [category, limit, cmsContext, userContext, query, categoriesById]);

    return (
        <div className="amp-dc-card-list product-grid-container">
            <div className="amp-dc-card-list-wrap product-grid">
                {products.map((product: Product) => {
                    const { variants = [], name, slug, id } = product;

                    const { listPrice, salePrice, images } = variants[0] || {};

                    const handleClickProduct = (event: any) => {
                        trackEvent({
                            category: 'Product',
                            action: 'Click',
                            label: id,
                            value: 1,
                        });
                    };

                    let firstImage: string = '';
                    if (images) {
                        if (images[0] && images[0].url) {
                            firstImage = images[0].url;
                            if (firstImage.indexOf('cdn.media.amplience.net') > 0) {
                                firstImage = getImageURL(firstImage, { width: 540 });
                            }
                        }
                    }

                    return (
                        <div key={slug} className="amp-dc-card product-grid-item">
                            <Link passHref href={`/product/${id}/${slug}`} onClick={handleClickProduct}>
                                <div className="amp-dc-card-wrap">
                                    <div className="amp-dc-card-img-wrap">
                                        <picture>
                                            <img
                                                loading="lazy"
                                                style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    objectFit: 'cover',
                                                }}
                                                src={firstImage}
                                                alt={firstImage}
                                            />
                                        </picture>
                                    </div>
                                    <div className="amp-dc-card-text-wrap">
                                        <div className="amp-dc-card-name">{name}</div>
                                        <p className="amp-dc-card-description">{listPrice}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductGrid;
