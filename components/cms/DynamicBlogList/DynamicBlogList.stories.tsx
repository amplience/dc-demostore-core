import React from 'react';

import DynamicBlogList from './DynamicBlogList';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Organisms/DynamicBlogList',
    component: DynamicBlogList,
} as Meta;

export const ExampleContent: StoryFn = (args) => (
    <ContentBlockStory request={{ key: 'docs/story/dynamicbloglist/list1' }} />
);
