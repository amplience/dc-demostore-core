const path = require('path')

module.exports = (phase, { defaultConfig }) => {
    return {
        sassOptions: {
            includePaths: [path.join(__dirname, 'styles')],
        },
        images: {
            remotePatterns: [
                {
                    protocol: "https",
                    hostname: "'qrickit.com",
                },
                {
                    protocol: "https",
                    hostname: "elyseo.eu",
                },
                {
                    protocol: "http",
                    hostname: "localhost",
                },
            ]
        },
        rewrites() {
            return [
                {
                    source: '/visualization',
                    destination: '/cms/visualization',
                },
                {
                    source: '/visualization/product',
                    destination: '/cms/visualization/product',
                },
                {
                    source: '/visualization/standalone',
                    destination: '/cms/visualization/standalone',
                },
                {
                    source: '/visualization/qr',
                    destination: '/cms/visualization/qr',
                },
                {
                    source: '/visualization/store',
                    destination: '/cms/visualization/store',
                },
                {
                    source: '/timestamp',
                    destination: '/cms/preview/timestamp',
                },
                {
                    source: '/current',
                    destination: '/cms/preview/current',
                },
                {
                    source: '/locale/:locale/currency/:currency',
                    destination: '/cms/preview/locale/:locale/currency/:currency',
                }
            ]
        }
    }
}