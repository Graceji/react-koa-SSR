const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://cnodejs.org',
  timeout: 10000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

module.exports = instance;
