const path = require('path');

console.log(path.resolve(__dirname, '../'))

module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  staticDirs: ['../public'],
  webpackFinal: async config => {
    config.resolve.alias = { ...config.resolve.alias,
      "@lib": path.resolve(__dirname, "../lib"),
      "@assets": path.resolve(__dirname, "../assets"),
      "@components": path.resolve(__dirname, "../components"),
      "@utils": path.resolve(__dirname, "../utils"),
      "@config": path.resolve(__dirname, "../config")
    };
    config.resolve.extensions.push(".ts", ".tsx", ".mdx");
    config.resolve.fallback = {
      ...config.resolve.fallback,
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http")
    }
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    });
    return config;
  },
  core: {
    builder: "webpack5"
  }
};