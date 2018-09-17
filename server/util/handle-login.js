const router = require('koa-router')();
const querystring = require('querystring');
const $http = require('./request');

router.post('/login', async (ctx, next) => {
  const { accessToken } = ctx.request.body;
  try {
    const result = await $http({
      url: '/api/v1/accesstoken',
      method: 'POST',
      data: querystring.stringify({
        accesstoken: accessToken,
      }),
    });
    if (result.status === 200 && result.data.success) {
      ctx.session.user = {
        accessToken,
        loginName: result.data.loginname,
        id: result.data.id,
        avatarUrl: result.data.avatar_url
      };
      ctx.data = result.data;
    }
  } catch (err) {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      // err.response.status => 401
      // err.response.data => { success: false, error_msg: '错误的accessToken' } }
      // ctx.data = {
      //   success: false,
      //   data: err.response.data
      // };
      ctx.data = err.response.data;
    } else {
      // 交给全局错误处理器处理，以后再加！！！
      console.log(err);
    }
  }
});

module.exports = router;
