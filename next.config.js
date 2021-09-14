module.exports = {
    /* config options here */
    target: 'experimental-serverless-trace',
    webpack(config, { isServer }) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        config.module.rules.push({
            test: /\.md$/,
            use: [
                'json-loader',
                'front-matter-loader',
            ],
        });

        if (!isServer) {
            config.resolve.fallback.fs = false;
        }

        return config;
    },
    future: {
        webpack5: true
    },
    generateBuildId: () => 'build'
};
