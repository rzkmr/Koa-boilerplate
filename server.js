import Koa from 'koa';
import path from 'path';

const serve = require('koa-static');
const render = require('koa-ejs');
const app = new Koa();

const viewpath = path.join(__dirname, 'views');
const assetspath = path.join(__dirname, 'app-www');

const port = process.env.PORT || 3000;

// renderer

render(app, {
  root: viewpath,
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true
});

app.use(serve(assetspath));

// x-response-time

app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(function (ctx, next) {
  ctx.state = ctx.state || {};
  ctx.state.now = new Date();
  ctx.state.ip = ctx.ip;
  ctx.state.version = '2.0.0';
  return next();
});

app.use(async function (ctx) {
  await ctx.render('index');
});

if (process.env.NODE_ENV === 'test') {
  module.exports = app.callback();
} else {
  app.listen(port, () => console.log('Application is running at http://localhost:' + port));
}

app.on('error', function (err) {
  console.log(err.stack);
});
