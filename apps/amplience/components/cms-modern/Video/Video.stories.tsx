import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Video from '@components/cms-modern/Video';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';

export default {
  title: 'Organisms/Video',
  component: Video,
} as Meta;

export const ExampleContent: Story = (args) => <ContentBlockStory request={{key: "docs/story/video/video1"}} />;
