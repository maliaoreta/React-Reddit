'use strict'
const express = require('express');
const app = express();
const isDeveloping = process.env.NODE_ENV !== 'Production';

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpack = require('webpack');
const config = require('./webpack.config.dev');
const path = require('path');

app.use(express.static('public'));

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });
  let response = (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(`${__dirname}/dist/index.html`)));
    res.end();
  };

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', response);
} else {
  let response = (req, res) => {
    res.sendFile(path.join(`${__dirname}/index.html`));
  };
  // app.use(express.static(`${__dirname}/public`));
  app.get('*', response);
}

app.listen(3000, () => {
  console.log("Listening on port 3000");
});