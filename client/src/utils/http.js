import axios from 'axios';

// console.log(process.env.NODE_ENV); // development
const baseUrl = 'https://cnodejs.org/api/v1'; // 开发环境

const parseUrl = (url, params) => {
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`;
    return result;
  }, '');
  return `${baseUrl}${url}?${str.substr(0, str.length - 1)}`;
};

export const get = (url, params) => (
  new Promise((resolve, reject) => {
    axios.get(parseUrl(url, params))
      .then((res) => {
        if (res.data && res.data.success) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject({
            success: false,
            err_msg: error.message,
          });
        }
      });
  })
);

export const post = (url, params, data) => (
  new Promise((resolve, reject) => {
    axios.post(parseUrl(url, params), data)
      .then((res) => {
        if (res.data && res.data.success) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject({
            success: false,
            err_msg: error.message,
          });
        }
      });
  })
);
