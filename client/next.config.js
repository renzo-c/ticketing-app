module.exports = {
  // pull all the different files inside the project directory each 300 ms
  webpack: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
