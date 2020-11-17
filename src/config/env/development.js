import baseConfig from './baseConfig';

const development = {
  publicPath: '/',
  baseUrl: 'http://swapi.dev/',
};

export default {
  ...baseConfig,
  ...development,
};
