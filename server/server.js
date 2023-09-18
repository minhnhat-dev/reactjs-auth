/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.post('/login', (req, res) => {
  console.log(req.body)
  // throw Error('Login error')
  //return res.jsonp({error: "Login error"})
  res.jsonp({...req.body, id: Date.now()})
})
// server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})