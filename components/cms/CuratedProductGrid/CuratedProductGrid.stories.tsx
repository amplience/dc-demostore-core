import React from 'react';

import CuratedProductGrid from '@components/cms/CuratedProductGrid';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Organisms/CuratedProductGrid',
    component: CuratedProductGrid,
} as Meta;

export const ExampleContent: StoryFn = (args) => (
    <ContentBlockStory request={{ key: 'docs/story/curatedproductgrid/grid1' }} />
);
