import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import Container from '@components/cms-modern/Container';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';

export default {
    title: 'Organisms/Container',
    component: Container,
} as Meta;

export const ExampleContent: StoryFn = (args) => <ContentBlockStory request={{ key: 'docs/story/container/homepage' }} />;
