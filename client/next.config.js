module.exports = {
  webpack: (config) => {
    // pull all the different files inside the project directory eash 300 ms
    config.watchOptions.poll = 300;
    return config;
  },
};
