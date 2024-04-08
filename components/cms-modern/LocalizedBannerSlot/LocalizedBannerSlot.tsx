import React from 'react';
import ContentBlock from '../ContentBlock';
import { CmsContent } from '@lib/cms/CmsContent';

type LocalizedBannerSlotProps = {} & CmsContent;

const LocalizedBannerSlot = ({ content }: LocalizedBannerSlotProps) => {
    return <ContentBlock content={content} />;
};

export default LocalizedBannerSlot;
