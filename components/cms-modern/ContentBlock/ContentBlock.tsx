import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { useContent } from '@components/core/WithVisualization/WithVisualization';

import AdvancedBanner from '@components/cms-modern/AdvancedBanner';
import BannerSlot from '@components/cms-modern/BannerSlot';
import Blog from '@components/cms-modern/Blog';
import BlogList from '@components/cms/BlogList';
import BlogSnippet from '@components/cms/BlogSnippet';
import Card from '@components/cms-modern/Card';
import CardList from '@components/cms-modern/CardList';
import CmsContentItem from '@components/cms-modern/CmsContentItem';
import CmsEdition from '@components/cms-modern/CmsEdition';
import CmsSlot from '@components/cms-modern/CmsSlot';
import Container from '@components/cms-modern/Container';
import CuratedProductGrid from '@components/cms-modern/CuratedProductGrid';
import CustomRichText from '@components/cms-modern/CustomRichText';
import DynamicBlogList from '@components/cms-modern/DynamicBlogList';
import ExternalBlock from '@components/cms-modern/ExternalBlock';
import FlexibleSlot from '@components/cms-modern/FlexibleSlot';
import Image from '@components/cms-modern/Image';
import ContentPage from '@components/cms-modern/ContentPage';
import LocalizedBannerSlot from '@components/cms-modern/LocalizedBannerSlot';
import PersonalizedBannerSlot from '@components/cms-modern/PersonalizedBannerSlot';
import ProductGrid from '@components/cms/ProductGrid';
import ProductContent from '@components/cms-modern/ProductContent';
import ShoppableImage from '@components/cms-modern/ShoppableImage';
import SimpleBanner from '@components/cms-modern/SimpleBanner';
import SimpleBannerBynder from '@components/cms-modern/SimpleBannerBynder';
import Slider from '@components/cms-modern/Slider';
import SplitBlock from '@components/cms-modern/SplitBlock';
import Store from '@components/cms-modern/Store';
import Text from '@components/cms-modern/Text';
import ThemePaletteSpec from '@components/cms-modern/ThemePaletteSpec';
import ThemeTypographySpec from '@components/cms-modern/ThemeTypographySpec';
import ThemeWrapper from '@components/cms-modern/ThemeWrapper';
import Video from '@components/cms-modern/Video';

import { useRouter } from 'next/router';
import Generic from '@components/stylitics/Generic/Generic';

export type ContentBlockType = 'SLOT' | 'CONTENT';

interface ContentBlockProps {
    name?: string;
    type?: ContentBlockType;
    content: CmsContent | null;
    components?: { [key: string]: any };
}

const ComponentMapping: any = {
    'https://demostore.amplience.com/content/advanced-banner': AdvancedBanner,
    'https://demostore.amplience.com/content/blog-list': BlogList,
    'https://demostore.amplience.com/content/blog-snippet': BlogSnippet,
    'https://demostore.amplience.com/content/blog': Blog,
    'https://demostore.amplience.com/content/card-list': CardList,
    'https://demostore.amplience.com/content/card': Card,
    'https://demostore.amplience.com/content/container': Container,
    'https://demostore.amplience.com/content/curated-product-grid': CuratedProductGrid,
    'https://demostore.amplience.com/content/dynamic-blog-list': DynamicBlogList,
    'https://demostore.amplience.com/content/html': ExternalBlock,
    'https://demostore.amplience.com/content/image': Image,
    'https://demostore.amplience.com/content/content-page': ContentPage,
    'https://demostore.amplience.com/content/product-grid': ProductGrid,
    'https://demostore.amplience.com/content/rich-text': CustomRichText,
    'https://demostore.amplience.com/content/shoppable-image': ShoppableImage,
    'https://demostore.amplience.com/content/simple-banner': SimpleBanner,
    'https://demostore.amplience.com/content/simple-localized-banner': SimpleBanner,
    'https://demostore.amplience.com/content/simple-banner-bynder': SimpleBannerBynder,
    'https://demostore.amplience.com/content/slider': Slider,
    'https://demostore.amplience.com/content/split-block': SplitBlock,
    'https://demostore.amplience.com/content/store': Store,
    'https://demostore.amplience.com/content/text': Text,
    'https://demostore.amplience.com/content/theme-wrapper': ThemeWrapper,
    'https://demostore.amplience.com/content/video': Video,
    'https://demostore.amplience.com/content/product': ProductContent,
    'https://demostore.amplience.com/content/product-override': ProductContent,
    'https://demostore.amplience.com/site/palette': ThemePaletteSpec,
    'https://demostore.amplience.com/site/typography': ThemeTypographySpec,
    'https://demostore.amplience.com/slots/banner': BannerSlot,
    'https://demostore.amplience.com/slots/container': BannerSlot,
    'https://demostore.amplience.com/slots/flexible': FlexibleSlot,
    'https://demostore.amplience.com/slots/content-page': BannerSlot,
    'https://demostore.amplience.com/slots/localized-banner': LocalizedBannerSlot,
    'https://demostore.amplience.com/slots/personalized-banner': PersonalizedBannerSlot,
    'https://demostore.amplience.com/content/stylitics/generic': Generic,
    'https://demostore.amplience.com/content/stylitics/hotspots': Generic,
    'https://demostore.amplience.com/content/stylitics/moodboard': Generic,
    'https://demostore.amplience.com/content/stylitics/gallery': Generic,
    'https://demostore.amplience.com/content/stylitics/classic': Generic,
    'https://demostore.amplience.com/content/stylitics/main-and-detail': Generic,
};

const ContentBlock = ({
    content: originalContent,
    type = 'CONTENT',
    components = ComponentMapping,
}: ContentBlockProps) => {
    const { query } = useRouter() || {};
    const vse = (query?.vse as string) || '';

    // Get real-time content from original content
    const [liveContent] = useContent(originalContent, vse);
    if (!liveContent) {
        return null;
    }

    const content = liveContent;
    const Component = components[content._meta.schema];
    const children = Component ? <Component {...content} /> : <>{JSON.stringify(content)}</>;

    const wrappedChildren =
        type === 'SLOT' ? (
            <CmsSlot key={content._meta.deliveryId} content={content}>
                {children}
            </CmsSlot>
        ) : (
            <CmsContentItem key={content._meta.deliveryId} content={content}>
                {children}
            </CmsContentItem>
        );

    if (content._meta && content._meta.edition) {
        return <CmsEdition content={content}>{wrappedChildren}</CmsEdition>;
    }

    return wrappedChildren;
};

export default ContentBlock;
