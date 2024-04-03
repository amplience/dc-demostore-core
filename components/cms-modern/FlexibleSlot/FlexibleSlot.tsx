import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import ContentBlock from '../ContentBlock';

interface Props {
    contentTypes: CmsContent[];
}

const FlexibleSlot = ({ contentTypes = [] }: Props) => {
    return (
        <>
            {contentTypes.map((content, index: number) => {
                return <ContentBlock key={index} content={content} />;
            })}
        </>
    );
};

export default FlexibleSlot;
