
module.exports = {
    title: 'Collection de composants React-OpenLayers ',
    exampleMode: 'hide',
    pagePerSection: true,
    ribbon: {
        url: 'https://github.com/sandix34/React-OpenLayers' 
    },
    dangerouslyUpdateWebpackConfig(webpackConfig, env) {
        // WARNING: inspect Styleguidist Webpack config before modifying it, otherwise you may break Styleguidist
        console.log(webpackConfig)
        webpackConfig.externals = {
          jquery: 'jQuery'
        }
        return webpackConfig
      }
};