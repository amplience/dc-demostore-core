import { ContentBlock } from '@components/cms-modern';
import AddToBasket from '@components/product/AddToBasket';
import ProductAttribute from '@components/product/ProductAttribute';
import ProductColor from '@components/product/ProductColor';
import ProductHero from '@components/product/ProductHero';
import ProductMediaViewer from '@components/product/ProductMediaViewer';
import Generic from '@components/stylitics/Generic/Generic';
import ProductRichText from '@components/product/ProductRichText';
import ProductSize from '@components/product/ProductSize';
import Accordion from '@components/ui/Accordion/Accordion';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Section } from '../../ui';
import _ from 'lodash';

type CmsComponentData = {
    name: string;
    properties: any;
    slots: {
        [name: string]: CmsComponentData[];
    };
};

interface Props {
    data?: CmsComponentData;
}

const mapping: any = {
    text: (props: any) => <>{props.text}</>,
    section: Section,
    typography: Typography,
    grid: (props: any) => {
        const breakpoints = {
            xs: props?.breakpoints?.xs && props.type === 'item' ? Number(props?.breakpoints?.xs) : undefined,
            sm: props?.breakpoints?.sm && props.type === 'item' ? Number(props?.breakpoints?.sm) : undefined,
            md: props?.breakpoints?.md && props.type === 'item' ? Number(props?.breakpoints?.md) : undefined,
            lg: props?.breakpoints?.lg && props.type === 'item' ? Number(props?.breakpoints?.lg) : undefined,
            xl: props?.breakpoints?.xl && props.type === 'item' ? Number(props?.breakpoints?.xl) : undefined,
        };

        const remappedProps = {
            ...props,
            item: props.type === 'item',
            container: props.type === 'container',
            direction: (props.type === 'container' && props.direction) || undefined,
            spacing: props.spacing ? Number(props.spacing) : undefined,
            ...breakpoints,
        };
        return <Grid {...remappedProps} />;
    },
    product_image_viewer: ProductMediaViewer,
    stylitics: Generic,
    product_attribute: ProductAttribute,
    product_atb: AddToBasket,
    product_size: ProductSize,
    product_color: ProductColor,
    product_hero: ProductHero,
    product_rich_text: ProductRichText,
    content_block: ContentBlock,
    accordion: Accordion,
    // 'product_header': ProductHeader,
    // 'product_image': ProductImage
};

const CmsComponent = ({ data }: Props) => {
    if (!data) {
        return null;
    }

    const { name, properties, slots } = data;

    let Component = mapping[name];
    if (!Component) {
        return null;
    }

    const hydratedSlots: { [slotName: string]: React.ReactElement } = {};
    if (slots) {
        for (let slotName of Object.keys(slots)) {
            hydratedSlots[slotName] = (
                <>
                    {slots[slotName].map((child, index: number) => (
                        <CmsComponent key={`${slotName}-${index}`} data={child} />
                    ))}
                </>
            );
        }
    }

    return <Component {...properties} {...hydratedSlots} />;
};

export default CmsComponent;
