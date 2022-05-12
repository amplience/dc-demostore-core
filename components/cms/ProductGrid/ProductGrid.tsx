import React, { FC, useEffect, useState } from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { useContentAnalytics } from '@lib/analytics';
import { useCmsContext } from '@lib/cms/CmsContext';

import { useUserContext } from '@lib/user/UserContext';
import { Category, Product } from '@amplience/dc-demostore-integration';
import { getCommerceAPI } from '@pages/api'
import { configLocator } from '@lib/config/AppContext';

type Props = {
} & CmsContent;

const ProductGrid: FC<Props> = ({
    category,
    query
}) => {
    const {
        trackEvent
    } = useContentAnalytics();

    const [products, setProducts] = useState<Product[]>([])

    const cmsContext = useCmsContext()
    const userContext = useUserContext()

    useEffect(() => {
        let isMounted: boolean = true
        getCommerceAPI({ config_locator: configLocator }).getCategory({ slug: category, ...cmsContext, ...userContext }).then((c: Category) => {
            if (isMounted && c?.products) {
                setProducts(c.products.filter(product => !query || product.name.toLowerCase().indexOf(query.toLowerCase()) > -1))
            }
        })
        return () => { isMounted = false }
    }, [category, cmsContext, userContext, query])

    return (
        <div className="amp-dc-card-list product-grid-container">
            <div className="amp-dc-card-list-wrap product-grid">
                {
                    products.map((product: Product) => {
                        const {
                            variants = [],
                            name,
                            slug,
                            id
                        } = product;

                        const {
                            listPrice,
                            salePrice,
                            images
                        } = variants[0] || {};

                        const handleClickProduct = (event: any) => {
                            trackEvent({
                                category: 'Product',
                                action: 'Click',
                                label: id,
                                value: 1
                            });
                        };

                        let firstImage: string = '';
                        if (images) {
                            if (images[0] && images[0].url) {
                                firstImage = images[0].url.replace("i8.amplience.net", "cdn.media.amplience.net");
                                if (firstImage.indexOf('cdn.media.amplience.net') > 0) {
                                    firstImage += '?fmt=auto&qlt=default&fmt.jpeg.qlt=75&fmt.webp.qlt=60&fmt.jp2.qlt=40&w=540&upscale=false'
                                }
                            }
                        }

                        return (
                            <div key={slug} className="amp-dc-card product-grid-item">
                                <a href={`/product/${id}/${slug}`} onClick={handleClickProduct}>
                                    <div className="amp-dc-card-wrap">
                                        <div className="amp-dc-card-img-wrap">
                                            <picture>
                                                <img loading="lazy" style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    objectFit: 'cover'
                                                }}
                                                    src={firstImage}
                                                    alt={firstImage}
                                                />
                                            </picture>
                                        </div>
                                        <div className="amp-dc-card-text-wrap">
                                            <div className="amp-dc-card-name">
                                                {name}
                                            </div>
                                            <p className="amp-dc-card-description">
                                                {listPrice}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default ProductGrid;