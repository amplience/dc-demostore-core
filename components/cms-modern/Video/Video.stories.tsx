import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import Video from '@components/cms-modern/Video';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';

export default {
    title: 'Organisms/Video',
    component: Video,
} as Meta;

export const ExampleContent: StoryFn = (args) => <ContentBlockStory request={{ key: 'docs/story/video/video1' }} />;
