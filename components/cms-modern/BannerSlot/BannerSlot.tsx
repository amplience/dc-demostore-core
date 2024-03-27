import React from 'react';
import ContentBlock from '../ContentBlock';
import { CmsContent } from '@lib/cms/CmsContent';

type Props = {} & CmsContent;

const BannerSlot = ({ content }: Props) => {
    return <ContentBlock content={content} />;
};

export default BannerSlot;
