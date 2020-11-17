import envConfig from 'envConfig'; //eslint-disable-line

const { baseUrl } = envConfig;
const baseUrlWithProtocol = baseUrl;

const headers = (additionalHeaders = {}) => {
  return {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    ...additionalHeaders,
  };
};

export const fetchURL = (url, urlPrefix = baseUrlWithProtocol) =>
  fetch(
    urlPrefix.concat(url),
    Object.assign({}, {
      headers: headers(),
    })).then(response => response.json());

export const doGet = (url, urlPrefix = baseUrlWithProtocol) => {
  const fetchData = fetchURL(url, urlPrefix);
  return fetchData;
};
