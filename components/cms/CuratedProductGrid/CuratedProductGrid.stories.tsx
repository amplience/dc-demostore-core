import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import CuratedProductGrid from '@components/cms/CuratedProductGrid';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';

export default {
  title: 'Organisms/CuratedProductGrid',
  component: CuratedProductGrid,
} as Meta;

export const ExampleContent: Story = (args) => <ContentBlockStory request={{key: "docs/story/curatedproductgrid/grid1"}} />;


