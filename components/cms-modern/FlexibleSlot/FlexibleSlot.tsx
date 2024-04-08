import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import ContentBlock from '../ContentBlock';
import { nanoid } from 'nanoid';

interface FlexibleSlotProps {
    contentTypes: CmsContent[];
}

const FlexibleSlot = ({ contentTypes = [] }: FlexibleSlotProps) => {
    return (
        <>
            {contentTypes.map((content) => {
                return <ContentBlock key={nanoid()} content={content} />;
            })}
        </>
    );
};

export default FlexibleSlot;
