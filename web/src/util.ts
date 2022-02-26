export const getApiEndpoint = () => {
  return import.meta.env.DEV
    ? 'http://localhost:3000/api'
    : 'http://localhost:3030/api';
};
