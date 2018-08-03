const router = require('koa-router')();
const querystring = require('querystring');
const $http = require('./request');

router.all('/:type/:subType?', async (ctx, next) => {
  const path = ctx.path;
  const user = ctx.session.user || {};
  const { needAccessToken } = ctx.query;
  if (needAccessToken && !user.accessToken) {
    ctx.status = 401;
    ctx.data = {
      success: false,
      msg: 'need login',
    };
  }

  const query = Object.assign({}, ctx.query);
  if (query.needAccessToken) delete query.needAccessToken;
  try {
    const result = await $http(path, {
      method: ctx.method,
      params: query,
      data: querystring.stringify(Object.assign({}, ctx.request.body, {
        accesstoken: user.accessToken
      })),
    });
    ctx.data = result.data;
  } catch (err) {
    ctx.status = 500; // ???
    if (err.response) {
      ctx.data = err.response.data;
    } else {
      ctx.data = {
        success: false,
        msg: '未知错误'
      };
    }
  }
});

module.exports = router;
