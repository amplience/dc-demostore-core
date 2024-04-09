import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import Text from '@components/cms-modern/Text';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';

export default {
    title: 'Organisms/Text',
    component: Text,
} as Meta;

export const ExampleContent: StoryFn = (args) => <ContentBlockStory request={{ key: 'docs/story/text/text1' }} />;
