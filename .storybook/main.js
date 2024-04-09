const path = require('path');

console.log(path.resolve(__dirname, '../'))

module.exports = {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],

  staticDirs: ['../public'],

  webpackFinal: async config => {
    config.resolve.alias = { ...config.resolve.alias,
      "@lib": path.resolve(__dirname, "../lib"),
      "@assets": path.resolve(__dirname, "../assets"),
      "@components": path.resolve(__dirname, "../components"),
      "@pages": path.resolve(__dirname, "../pages"),
      "@utils": path.resolve(__dirname, "../utils"),
      "@config": path.resolve(__dirname, "../config")
    };
    return config;
  },

  framework: {
    name: "@storybook/nextjs",
    options: {}
  },

  docs: {
    autodocs: true
  }
};