import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Logo } from '@components/core';

export default {
    title: 'Atoms/Logo',
    component: Logo,
} as Meta;

export const Main: Story = (args) => <Logo {...args} />;
