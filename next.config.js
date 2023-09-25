const path = require('path')

module.exports = (phase, { defaultConfig }) => {
    return {
        webpack: (config, { isServer }) => {
            if (!isServer) {
                // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
                config.resolve.fallback = {
                    fs: false,
                    crypto: false,
                    http: false,
                    https: false,
                    process: false,
                    assert: false,
                    stream: false,
                    constants: false,
                    path: false,
                    events: false,
                    buffer: false,
                    util: false
                }
            }
            return config;
        },
        // experimental: { granularChunks: true },
        sassOptions: {
            includePaths: [path.join(__dirname, 'styles')],
        },
        images: {
            domains: ['qrickit.com', 'elyseo.eu'],
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