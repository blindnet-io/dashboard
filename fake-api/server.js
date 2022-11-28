const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('fake-api/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))

server.post('/login', (req, res) => {
  res.jsonp({ token: "token_123" })
})

server.put('/app-groups', (req, res, next) => {
  const id = (Math.random() + 1).toString(36).substring(7)
  req.body.id = id
  req.body.applications = []
  req.method = 'POST'
  next()
})

server.use(router)
server.listen(5000, () => {
  console.log('JSON Server is running')
})