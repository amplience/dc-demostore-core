import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { CallToAction } from '@components/cms-modern';

export default {
    title: 'Organisms/CallToAction',
} as Meta;

export const Outlined: StoryFn = () => (
    <CallToAction href="#" className="amp-dc-card-link">
        Shop now
    </CallToAction>
);
export const Contained: StoryFn = () => (
    <CallToAction variant="contained" href="#" className="amp-dc-card-link">
        Shop now
    </CallToAction>
);
