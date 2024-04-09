import BlogSnippetComponent from '@components/cms/BlogSnippet';
import { BlogSnippetProps } from './BlogSnippet';
import { Meta } from '@storybook/react';

export default {
    title: 'Organisms/BlogSnippet',
    component: BlogSnippetComponent
} as Meta;

const Template = (args: BlogSnippetProps) => {
    return <BlogSnippetComponent {...args} />;
};

export const BlogSnippet = {
    render: Template.bind({}),
    name: 'BlogSnippet',

    args: {
        image: {
            image: {
                _meta: {
                    schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link',
                },

                id: '806df523-fd2c-419a-8c76-80664aac8976',
                name: '5f9c3f8dfaf7ea39d06b2404_1280x1280',
                endpoint: 'rezademo',
                defaultHost: '1dpf8i5xxl3cn1xccm0grjyowp.staging.bigcontent.io',
            },

            imageAltText: 'Anna Barnett',

            _meta: {
                schema: 'https://demostore.amplience.com/content/image',
            },
        },

        cta: {
            label: 'Read more',
            value: 'https://www.hush-uk.com/lifestyle/hush-meets-anna-barnett.html',
            type: 'URL',

            _meta: {
                schema: 'https://demostore.amplience.com/lib/link',
            },
        },

        blogdate: '2021/01/18',
        title: 'For the love of food',
        description:
            'Cook, author and food writer Anna Barnett on food, friendship and how \nshe’s determined to make every mealtime special',
        author: 'Macadamia Smith',

        _meta: {
            schema: 'https://demostore.amplience.com/content/blog-snippet',
        },

        tags: [
            {
                id: '641492c4-215c-42b1-a90c-d43b358e9e73',
                contentType: 'https://demostore.amplience.com/site/tag',

                _meta: {
                    schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                },
            },
            {
                id: '9ceff52e-9af7-4ab3-973f-b9b5db15cb5d',
                contentType: 'https://demostore.amplience.com/site/tag',

                _meta: {
                    schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                },
            },
        ],

        category: ['beauty'],
    },
};
