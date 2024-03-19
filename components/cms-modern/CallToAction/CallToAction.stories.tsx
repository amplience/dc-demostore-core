import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CallToAction } from '@components/cms-modern';

export default {
    title: 'Organisms/CallToAction',
} as Meta;

export const Outlined: Story = () => (
    <CallToAction href="#" className="amp-dc-card-link">
        Shop now
    </CallToAction>
);
export const Contained: Story = () => (
    <CallToAction variant="contained" href="#" className="amp-dc-card-link">
        Shop now
    </CallToAction>
);
