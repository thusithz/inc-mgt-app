module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
  staticPageGenerationTimeout: 120,
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL
  },
};
