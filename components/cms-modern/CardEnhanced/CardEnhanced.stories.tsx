import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CardEnhanced } from '@components/cms-modern';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';

export default {
  title: 'Organisms/CardEnhanced',
  component: CardEnhanced,
} as Meta;

export const ExampleContent: Story = (args) => <ContentBlockStory request={{key: "cards/card1"}} />;
