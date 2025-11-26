const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
module.exports = withNextIntl({
    transpilePackages: [
        '@markslides/renderer',
        '@markslides/editor',
        '@markslides/ui',
    ],
})
