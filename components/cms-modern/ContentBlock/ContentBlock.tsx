import React, { FC } from 'react'
import { CmsContent } from '@lib/cms/CmsContent';
import { useContent } from '@components/core/WithVisualization/WithVisualization';
import { nanoid } from 'nanoid'

import AdvancedBanner           from '@components/cms-modern/AdvancedBanner';
import BannerSlot               from '@components/cms-modern/BannerSlot';
import Blog                     from '@components/cms-modern/Blog';
import BlogList                 from '@components/cms/BlogList';
import BlogSnippet              from '@components/cms/BlogSnippet';
import Card                     from '@components/cms-modern/Card';
import CardList                 from '@components/cms-modern/CardList';
import CmsContentItem           from '@components/cms-modern/CmsContentItem';
import CmsEdition               from '@components/cms-modern/CmsEdition';
import CmsSlot                  from '@components/cms-modern/CmsSlot';
import Container                from '@components/cms-modern/Container';
import CuratedProductGrid       from '@components/cms/CuratedProductGrid';
import CustomRichText           from '@components/cms-modern/CustomRichText';
import DynamicBlogList          from '@components/cms/DynamicBlogList';
import ExternalBlock            from '@components/cms-modern/ExternalBlock';
import FlexibleSlot             from '@components/cms-modern/FlexibleSlot';
import Image                    from '@components/cms-modern/Image';
import LandingPage              from '@components/cms-modern/LandingPage';
import LocalizedBannerSlot      from '@components/cms-modern/LocalizedBannerSlot';
import PersonalizedBannerSlot   from '@components/cms-modern/PersonalizedBannerSlot';
import ProductGrid              from '@components/cms/ProductGrid';
import ProductContent           from '@components/cms-modern/ProductContent';
import SimpleBanner             from '@components/cms-modern/SimpleBanner';
import Slider                   from '@components/cms-modern/Slider';
import SplitBlock               from '@components/cms-modern/SplitBlock';
import Store                    from '@components/cms-modern/Store';
import Text                     from '@components/cms-modern/Text';
import ThemePaletteSpec         from '@components/cms-modern/ThemePaletteSpec';
import ThemeTypographySpec      from '@components/cms-modern/ThemeTypographySpec';
import ThemeWrapper             from '@components/cms-modern/ThemeWrapper';
import Video                    from '@components/cms-modern/Video';

import { useRouter } from 'next/router';

export type ContentBlockType = 'SLOT' | 'CONTENT';

interface Props {
    name?: string;
    type?: ContentBlockType;
    content: CmsContent | null;
    components?: { [key: string]: any };
}

const ComponentMapping: any = {
    'https://amprsa.net/content/advanced-banner'        : AdvancedBanner,
    'https://amprsa.net/content/blog-list'              : BlogList,
    'https://amprsa.net/content/blog-snippet'           : BlogSnippet,
    'https://amprsa.net/content/blog'                   : Blog,
    'https://amprsa.net/content/card-list'              : CardList,
    'https://amprsa.net/content/card'                   : Card,
    'https://amprsa.net/content/container'              : Container,
    'https://amprsa.net/content/curated-product-grid'   : CuratedProductGrid,
    'https://amprsa.net/content/dynamic-blog-list'      : DynamicBlogList,
    'https://amprsa.net/content/html'                   : ExternalBlock,
    'https://amprsa.net/content/image'                  : Image,
    'https://amprsa.net/content/landing-page'           : LandingPage,
    'https://amprsa.net/content/product-grid'           : ProductGrid,
    'https://amprsa.net/content/rich-text'              : CustomRichText,
    'https://amprsa.net/content/simple-banner'          : SimpleBanner,
    'https://amprsa.net/content/simple-localized-banner': SimpleBanner,
    'https://amprsa.net/content/slider'                 : Slider,
    'https://amprsa.net/content/split-block'            : SplitBlock,
    'https://amprsa.net/content/store'                  : Store,
    'https://amprsa.net/content/text'                   : Text,
    'https://amprsa.net/content/theme-wrapper'          : ThemeWrapper,
    'https://amprsa.net/content/video'                  : Video,
    'https://amprsa.net/content/product'                : ProductContent,
    'https://amprsa.net/site/palette'                   : ThemePaletteSpec,
    'https://amprsa.net/site/typography'                : ThemeTypographySpec,
    'https://amprsa.net/slots/banner'                   : BannerSlot,
    'https://amprsa.net/slots/container'                : BannerSlot,
    'https://amprsa.net/slots/flexible'                 : FlexibleSlot,
    'https://amprsa.net/slots/landing-page'             : BannerSlot,
    'https://amprsa.net/slots/localized-banner'         : LocalizedBannerSlot,
    'https://amprsa.net/slots/personalized-banner'      : PersonalizedBannerSlot
    
};

const ContentBlock: FC<Props> = ({content: originalContent, type = 'CONTENT', components = ComponentMapping}) => {
    const {
        query
    } = useRouter() || {};
    const vse = query?.vse as string || '';

    // Get real-time content from original content
    const [liveContent] = useContent(originalContent, vse);
    if (!liveContent) {
        return null
    }

    const content = liveContent;
    const Component = components[content._meta.schema];
    const children = Component ? <Component {...content} /> : <>{JSON.stringify(content)}</>;
    
    const wrappedChildren = (
        type === 'SLOT' ? (
            <CmsSlot key={ nanoid() } content={content}>
                {children}
            </CmsSlot>
        ) : (
            <CmsContentItem key={ nanoid() } content={content}>
                {children}
            </CmsContentItem>
        )
    )

    if (content._meta && content._meta.edition) {
        return <CmsEdition content={content}>
            {wrappedChildren}
        </CmsEdition>
    }

    return wrappedChildren;
}

export default ContentBlock;