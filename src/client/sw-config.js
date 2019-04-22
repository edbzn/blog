module.exports = {
  staticFileGlobs: ['dist/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.codamit\/.com/,
      handler: 'fastest',
    },
    {
      urlPattern: /^https:\/\/codamit\/.com/,
      handler: 'fastest',
    },
  ],
};
