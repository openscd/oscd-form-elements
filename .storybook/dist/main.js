"use strict";
exports.__esModule = true;
var config = {
    stories: [
        '../src/**/*.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
        '../stories/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        'storybook-design-tokens',
    ],
    framework: {
        name: '@storybook/web-components-webpack5',
        options: {}
    },
    docs: {
        autodocs: true
    }
};
exports["default"] = config;
