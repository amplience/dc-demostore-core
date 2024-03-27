import React from 'react';

import { Logo } from '@components/core';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'Atoms/Logo',
    component: Logo,
} as Meta;

export const Main: StoryFn = (args) => <Logo {...args} />;
