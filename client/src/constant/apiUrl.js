const apiUrl =
  process.env.NODE_ENV !== 'production'
    ? 'https://learn-it2203.herokuapp.com/api'
    : 'somedeployurl';
export default apiUrl;
