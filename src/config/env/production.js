import baseConfig from './baseConfig';

const production = {
  publicPath: '/',
  baseUrl: 'http://swapi.dev/',
};

export default {
  ...baseConfig,
  ...production,
};
