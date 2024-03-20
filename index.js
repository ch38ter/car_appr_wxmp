const Koa = require('koa');

const app = new Koa();


const userRouter = require('./src/users.router.js')
const roleRouter = require('./src/role.router.js')
const loginRouter = require('./src/login.router.js')


app.use(userRouter.routes())
app.use(roleRouter.routes())
app.use(loginRouter.routes())

app.listen(3000, () => {
  console.log('server is running at http://127.0.0.1:3000')
})

