import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Container from '@components/cms-modern/Container';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';

export default {
  title: 'Organisms/Container',
  component: Container,
} as Meta;

export const ExampleContent: Story = (args) => <ContentBlockStory request={{key: "docs/story/container/homepage"}} />;
