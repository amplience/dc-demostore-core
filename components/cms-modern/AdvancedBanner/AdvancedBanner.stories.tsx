import AdvancedBannerComponent from '@components/cms-modern/AdvancedBanner';
import { Meta } from '@storybook/react';
import { AdvancedBannerProps } from './AdvancedBanner';

export default {
    title: 'Organisms/AdvancedBanner',
    component: AdvancedBannerComponent,

    argTypes: {
        textPositioning: {
            table: {
                disable: true,
            },
        },

        bgcol: {
            control: {
                type: 'color',
            },
        },

        image: {
            table: {
                disable: true,
            },
        },

        opacity: {
            description: 'Panel opacity',
            defaultValue: 0.9,

            table: {
                defaultValue: {
                    summary: '0.9',
                },
            },

            control: {
                type: 'number',
                min: 0,
                max: 1,
                step: 0.05,
            },
        },

        textPositionHorizontal: {
            description: 'Panel horizontal position',

            table: {
                defaultValue: {
                    summary: 'right',
                },
            },

            control: {
                type: 'select',
                options: ['left', 'center', 'right'],
            },
        },

        textPositionVertical: {
            description: 'Panel vertical position',

            table: {
                defaultValue: {
                    summary: 'middle',
                },
            },

            control: {
                type: 'select',
                options: ['top', 'middle', 'bottom'],
            },
        },
    },
} as Meta;

const Template = (args: any) => {
    args.textPositioning = {
        textPositionHorizontal: args.textPositionHorizontal,
        textPositionVertical: args.textPositionVertical,
    };
    args.overlaypanel = {
        opacity: args.opacity,
    };
    return <AdvancedBannerComponent {...args} />;
};

export const AdvancedBanner = {
    render: Template.bind({}),
    name: 'Advanced Banner',

    args: {
        textPositionHorizontal: 'right',
        textPositionVertical: 'middle',

        image: {
            img: {
                image: {
                    crop: [0, 0, 0, 0],
                    rot: 0,
                    hue: 0,
                    sat: 0,
                    bri: 0,
                    fliph: false,
                    flipv: false,

                    poi: {
                        x: 0.6856617647058824,
                        y: 0.29052734375,
                    },

                    aspectLock: 'poi',

                    image: {
                        _meta: {
                            schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
                        },

                        id: '0013556d-0aa8-412e-83b9-479bf89d8c0e',
                        name: '180815-mens-wardrobe-reload',
                        endpoint: 'rezademo',
                        defaultHost: '1dpf8i5xxl3cn1xccm0grjyowp.staging.bigcontent.io',
                    },

                    query: 'poi=0.6857,0.2905,0,0&scaleFit=poi',
                },
            },

            disablePoiAspectRatio: false,
            imageAltText: 'mens',

            _meta: {
                schema: 'https://demostore.amplience.com/lib/di-image',
            },
        },

        overlaypanel: {
            opacity: 0.9,
            col: 'rgb(255, 255, 255)',
        },

        textPositioning: {
            textPositionHorizontal: 'left',
            textPositionVertical: 'middle',
        },

        textLines: [
            {
                text: 'Mens Clothing',
                variant: 'h1',
                align: 'left',
            },
            {
                text: 'Perfect additions to your wardrobe',
                variant: 'h2',
                align: 'left',
            },
            {
                text: 'Update your wardobe with the latest menswear clothing line from ANYA FINN.',
                align: 'left',
            },
        ],

        ctas: [
            {
                buttonText: 'Shop Now',
                variant: 'contained',
                linkUrl: '#',
            },
        ],
    },
};
