import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Text from '@components/cms-modern/Text';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';

export default {
  title: 'Organisms/Text',
  component: Text,
} as Meta;

export const ExampleContent: Story = (args) => <ContentBlockStory request={{key: "docs/story/text/text1"}} />;
