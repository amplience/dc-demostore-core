import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { SimpleBanner } from '@components/cms-modern';
import ContentBlockStory from '@utils/storybook/ContentBlockStory';

export default {
  title: 'Organisms/SimpleBanner',
  component: SimpleBanner,
  args: {
      opacity: 0.9,
      header: "New Collection",
      textPositionHorizontal: "right",
      textPositionVertical: "middle"
  },
  argTypes: {
    header: {
      description: 'Banner text header',
      control: {
        type: 'text'
      }
    },
    subheader: {
      description: 'Banner text sub-header',
      control: {
        type: 'text'
      }
    },
    description: {
      description: 'Banner text description',
      control: {
        type: 'text'
      }
    }, 
    opacity: {
      description: 'Panel opacity',
      table: {
        defaultValue: { summary: '0.9' }
      },
      control: {
        type: 'number',
        min: 0,
        max: 1,
        step: 0.05
      }
    },
    textPositionHorizontal: {
      description: 'Panel horizontal position',
      table: {
        defaultValue: { summary: 'right' }
      },
      control: {
        type: 'select',
        options: ['left', 'center', 'right'],
      },
    },
    textPositionVertical: {
      description: 'Panel vertical position',
      table: {
        defaultValue: { summary: 'middle' }
      },
      control: {
        type: 'select',
        options: ['top', 'middle', 'bottom'],
      },
    },
  },
} as Meta;

const Template = (key: string) => {
  return (args: any) => {
    const overrideContent = (content: any) => {
      content.textPositioning.textPositionHorizontal = args.textPositionHorizontal ? args.textPositionHorizontal : 'right';
      content.textPositioning.textPositionVertical = args.textPositionVertical ? args.textPositionVertical : 'middle';
      content.opacity = args.opacity ? args.opacity : '0.9';
      content.bannerText.header = args.header ? args.header : 'New Collection';
      content.bannerText.subheader = args.subheader ? args.subheader : '';
      content.bannerText.description = args.description ? args.description : '';
      return {
        ...content,
        content: content
      }
    };
    return <ContentBlockStory request={{key}} overrideContent={overrideContent} />;
  }
}

export const ExampleContent = Template("docs/story/simplebanner/banner1");
