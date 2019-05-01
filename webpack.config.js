const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new CopyPlugin([
          { from: 'public/data', to: 'styleguide/static' }
        ])
      ]
}