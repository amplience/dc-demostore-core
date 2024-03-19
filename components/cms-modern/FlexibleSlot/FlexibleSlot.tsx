import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import ContentBlock from '../ContentBlock';
import { nanoid } from 'nanoid';

interface Props {
    contentTypes: CmsContent[];
}

const FlexibleSlot = ({ contentTypes = [] }: Props) => {
    return (
        <>
            {contentTypes.map((content) => {
                return <ContentBlock key={nanoid()} content={content} />;
            })}
        </>
    );
};

export default FlexibleSlot;
