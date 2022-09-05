import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { SplitBlock } from '@components/cms-modern';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';

export default {
  title: 'Organisms/SplitBlock',
  component: SplitBlock
} as Meta;

const Template = (key: string, split: string, reverse: boolean = false) => {
  return () => {
    const overrideContent = (content: any) => {
      return {
        ...content,
        split,
        content: reverse ? [...content.content].reverse() : content.content
      }
    };
    return <ContentBlockStory request={{key}} overrideContent={overrideContent} />;
  }
}

export const TextAndImage_50_50 = Template("docs/story/splitblock/block1", '50/50');
export const TextAndImage_50_50_Reversed = Template("docs/story/splitblock/block1", '50/50', true);
export const TextAndImage_70_30 = Template("docs/story/splitblock/block1", '70/30');
export const TextAndImage_70_30_Reversed = Template("docs/story/splitblock/block1", '70/30', true);
export const TextAndImage_30_70 = Template("docs/story/splitblock/block1", '30/70');
export const TextAndImage_30_70_Reversed = Template("docs/story/splitblock/block1", '30/70', true);
