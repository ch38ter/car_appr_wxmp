const Router = require('koa-router')
const router = new Router()
const { koaBody } = require('koa-body')
router.use(koaBody({
  multipart: true
}))

const axios = require('axios')

const baseUrl = '/login'

const getRealUrl = (url) => {
  return baseUrl + url
}

router.get(getRealUrl('/1'), koaBody(), (ctx) => {
  const para1 = ctx.request.body;
  console.log(para1);
  const para2 = ctx.request.body;
  const method = ctx.method;
  ctx.body = method + para1 + para2;
})

router.post(getRealUrl('/2'), async (ctx) => {
  console.log("abcefg");
  try {
    const req_body = ctx.request.body;
    code = req_body.code;
    appid = "wxedad56d1ffa863f4";
    secret = "577b0a4c14198441e2343bcb1155393c"
    console.log(code, appid, secret);
    let openid;
    if (!code) {
      return Promise.reject("No code found in req body!");
    }

    await axios
      .get("https://api.weixin.qq.com/sns/jscode2session", {
        params: {
          appid: appid,
          secret: secret,
          js_code: code,
          grant_type: "authorization_code",
        },
      })
      .then((response) => {
        console.log(response)
        if (response.data.errcode) {
          return Promise.reject("非法的用户凭证");
        }
        openid = response.data.openid;
      });
    let userinfo = await searchUserOpenId(openid);
    if (userinfo.length !== 0) {
      // reust.send(senf.init(200, userinfo[0]));
    } else {
      //判断是否存在用户，如果存在，则直接生成jwt生成token;不存在则创建用户，然后再用jwt生成token。

      // 创建用户
      let creatUserinfoStatus = await CreateUserinfo({
        hash: uuid.v4(),
        name: "",
        openid: openid,
        avatar:
          "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
      });
      console.log("creatUserinfoStatus", creatUserinfoStatus);
      // reust.send(senf.init(200, creatUserinfoStatus));
    }
    console.log("userinfo", userinfo);


  }
  catch (err) {
    // 用户没有被创建等...
    console.log("err", err);
    reust.send(senf.init(400, err || "请检查网络环境"));
  }
}
)
module.exports = router
