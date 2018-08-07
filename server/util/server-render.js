const bootstrapper = require('react-async-bootstrapper');
const ReactSSR = require('react-dom/server');
const Helmet = require('react-helmet').default;
const ejs = require('ejs');
const serialize = require('serialize-javascript');

// 获取state
const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson();
    return result;
  }, {});
}

module.exports = async (ctx, next, bundle, template) => {
  const routerContext = {};
  const createStoreMap = bundle.createStoreMap
  const stores = createStoreMap();
  const createApp = bundle.default;
  const appTemplate = createApp(stores, routerContext, ctx.url);

  await bootstrapper(appTemplate)
    .then(() => {
      const appString = ReactSSR.renderToString(appTemplate);
      const helmet = Helmet.renderStatic();

      // 当路由中有redirect的情况
      // If we find a context.url, then we know the app redirected
      if (routerContext.url) {
        // ctx.status = 302;
        ctx.redirect(routerContext.url);
        return;
      }

      const state = getStoreState(stores);
      console.log('state', state);

      // 将数据插入到html中，完成client端数据的同步
      const html = ejs.render(template, {
        initialState: serialize(state),
        appString,
        title: helmet.title.toString(),
        meta: helmet.meta.toString(),
        link: helmet.link.toString(),
        style: helmet.style.toString(),
      });
      ctx.body = html;
    })
    .catch(err => next(err));    
};