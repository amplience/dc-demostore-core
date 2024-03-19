import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import DynamicBlogList from './DynamicBlogList';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';

export default {
    title: 'Organisms/DynamicBlogList',
    component: DynamicBlogList,
} as Meta;

export const ExampleContent: Story = (args) => (
    <ContentBlockStory request={{ key: 'docs/story/dynamicbloglist/list1' }} />
);
