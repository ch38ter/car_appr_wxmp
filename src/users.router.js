const Router = require('koa-router')
const router = new Router()

const baseUrl = '/users'

const getRealUrl = (url)=> {
  return baseUrl + url
}

router.get(getRealUrl('/list'), (ctx)=> {
  ctx.body = `通过${ ctx.method }方式请求，请求地址为${ ctx.url }`
})

router.post(getRealUrl('/add'), (ctx)=> {
  ctx.body = `通过${ ctx.method }方式请求，请求地址为${ ctx.url }`
})

module.exports = router

