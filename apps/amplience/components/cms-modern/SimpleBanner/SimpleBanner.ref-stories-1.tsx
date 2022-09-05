import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import SimpleBanner from '@components/cms-modern/SimpleBanner';

export default {
  title: 'Organisms/SimpleBanner',
  component: SimpleBanner,
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
    ctaText: {
      description: 'Call-to-action text',
      control: {
        type: 'text'
      }
    },
    ctaUrl: {
      description: 'Call-to-action URL',
      control: {
        type: 'text'
      }
    },
    opacity: {
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
  args: {
    header: "New Collection",
    textPositionHorizontal: "right",
    textPositionVertical: "middle",
    ctaText: "Shop collection",
    ctaUrl: "/category/women",
    image: {
      img: {
        image: {
          crop: [
            0,
            0,
            0,
            0
          ],
          rot: 0,
          hue: 0,
          sat: 0,
          bri: 0,
          fliph: false,
          flipv: false,
          poi: {
            x: 0.2678571428571429,
            y: 0.413265306122449
          },
          aspectLock: "poi",
          image: {
            _meta: {
              schema: "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
            },
            id: "7ea53111-9ab7-4e1e-b51f-682c4b7692b2",
            name: "190207-homepage-date-night-slide",
            endpoint: "rezademo",
            defaultHost: "1dpf8i5xxl3cn1xccm0grjyowp.staging.bigcontent.io"
          },
          query: "poi=0.2679,0.4133,0,0&scaleFit=poi"
        }
      },
      component: "Image",
      imageAltText: "Dress",
      _meta: {
        schema: "https://demostore.amplience.com/lib/di-image"
      },
      disablePoiAspectRatio: false
    },
    opacity: 0.9
  }
} as Meta;

const Template = () => {
  return (args: any) => {
    args.bannerText = { 
      header: args.header,
      subheader: args.subheader,
      description: args.description
    }
    args.ctaSettings = {
      buttonText: args.ctaText,
      linkUrl: args.ctaUrl
    }
    args.textPositioning = {
      textPositionHorizontal: args.textPositionHorizontal,
      textPositionVertical: args.textPositionVertical,
    }
    return <SimpleBanner {...args}/>;
  }
}

export const ExampleContent = Template();
