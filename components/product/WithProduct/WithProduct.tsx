import { createContext, PropsWithChildren, useContext, useState } from 'react';

type ProductContextState = {
    product: any;
    productVariant?: any;
    attributes: { [key: string]: any };
    setAttribute(name: string, value: any): void;
};

const ProductContext = createContext<ProductContextState | null>(null);

interface WithProductProps extends PropsWithChildren<any> {
    product: any;
}

export function useProduct(): ProductContextState | null {
    return useContext(ProductContext);
}

const WithProduct = (props: WithProductProps) => {
    const [attributes, setAttributes] = useState<any>({});

    const setAttribute = (attributeName: string, value: any) => {
        setAttributes({
            ...attributes,
            [attributeName]: value,
        });
    };

    const productVariant =
        props.product.variants.find((x: any) => {
            for (let attributeName of Object.keys(attributes)) {
                if (x[attributeName] != attributes[attributeName]) {
                    return false;
                }
            }
            return true;
        }) || props.product.variants[0];

    return (
        <ProductContext.Provider
            value={{
                ...props,
                productVariant,
                attributes,
                setAttribute,
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
};

export default WithProduct;
