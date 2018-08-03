const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const cors = require('koa2-cors');
// const views = require('koa-views');
const ReactSSR = require('react-dom/server');
const loginRouter = require('./util/handle-login');
const proxy = require('./util/proxy');
const handleResponse = require('./middlewares/handle-response');

const app = new Koa();
app.keys = ['koa ssr demo'];

const router = new Router();
const config = {
  key: 'koa:ssr',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
};

app.use(handleResponse);
app.use(cors({
  credentials: true, // request 的 credentials属性表示是否允许其他域发送cookie
}));
app.use(bodyParser());
app.use(session(config, app));

router.use('/api/user', loginRouter.routes());
router.use('/api/v1', proxy.routes());

if (process.env.NODE_ENV === 'development') {
  const devStatic = require('./util/dev-static');
  devStatic(app, router);
} else {
  const serverEntry = require('../dist/static/js/server-entry');
  const template = fs.readFileSync(path.resolve(__dirname, '../dist/app.html'), 'utf-8');
  app.use(serve(path.join(__dirname, '../dist')));

  router.get('*', async (ctx, next) => {
    const appString = ReactSSR.renderToString(serverEntry.default);
    ctx.body = template.replace('<!-- app -->', appString);
  });
}

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3333, () => {
  console.log('server is listening at port 3333');
});
