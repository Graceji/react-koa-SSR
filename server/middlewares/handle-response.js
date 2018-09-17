const filterBody = (ctx) => {
  if (ctx.data && ctx.data.error) {
    ctx.body = {
      ...ctx.data.error
      // callStatus: 'FAILED',
      // data: ctx.data.error
    };
  } else {
    ctx.body = {
      ...ctx.data
      // callStatus: 'SUCCEED',
      // data: ctx.data,
    };
  }
};

module.exports = async (ctx, next) => {
  const reg = new RegExp('^/api');
  await next();
  if (reg.test(ctx.originalUrl)) {
    filterBody(ctx);
  }
};
