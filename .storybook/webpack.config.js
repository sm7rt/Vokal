const path = require('path');

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
      plugins: [
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
      ]
    }
  });

  config.resolve.extensions.push('.ts', '.tsx');

  // config.module.rules.push({
  //   test: /^((?!\.module).)*scss$/,
  //   loaders: ['style-loader', 'css-loader', 'sass-loader'],
  //   include: path.resolve(__dirname, '../')
  // });
  config.module.rules.push({
    test: /\.less$/,
    loaders: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: { javascriptEnabled: true }
      }
    ]
    // include: path.resolve(__dirname, '../src/')
  });

  config.module.rules.push({
    test: /\.(csv|xlsx)$/,
    use: {
      loader: 'file-loader',
      options: {
        name: 'fonts/[hash].[ext]'
      }
    }
  });
  return config;
};
