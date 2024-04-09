import React from 'react';
import ContentBlock from '../ContentBlock';
import { CmsContent } from '@lib/cms/CmsContent';

type BannerSlotProps = {} & CmsContent;

const BannerSlot = ({ content }: BannerSlotProps) => {
    return <ContentBlock content={content} />;
};

export default BannerSlot;
