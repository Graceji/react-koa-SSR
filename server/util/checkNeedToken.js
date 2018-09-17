module.exports = {
  async checkNeedToken (ctx, next) {
    const { needAccessToken } = ctx.query;
    const user = ctx.session.user || {};

    if (needAccessToken && !user.accessToken) {
      ctx.status = 401;
      ctx.data = {
        success: false,
        msg: 'need login',
      }
      return;
    }
    await next();
  }
};
