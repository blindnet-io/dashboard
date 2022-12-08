const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')

var db = {
  "account": {
    "email": "test@blindnet.io"
  },
  "app-groups": [
    {
      "id": "group_1",
      "name": "group_one",
      "description": "this is group one",
      "key": "key_1",
      "applications": [
        {
          "id": "group_1_app_1",
          "name": "group_one_app_1",
          "active": true
        },
        {
          "id": "group_1_app_2",
          "name": "group_one_app_2",
          "active": true
        },
        {
          "id": "group_1_app_3",
          "name": "group_one_app_3",
          "active": false
        }
      ]
    },
    {
      "id": "group_2",
      "name": "group_two",
      "description": "this is group two",
      "key": "key_2",
      "applications": [
        {
          "id": "group_2_app_1",
          "name": "group_two_app_1",
          "active": true
        },
        {
          "id": "group_2_app_2",
          "name": "group_two_app_2",
          "active": true
        }
      ]
    },
    {
      "id": "group_3",
      "name": "group_three",
      "key": "key_3",
      "description": null,
      "applications": []
    }
  ]
}

const server = express()
server.use(bodyParser.json())
server.use(cors())

server.post('/api/login', (req, res) => {
  res.jsonp({ token: "token_123" })
})

server.get('/api/app-groups', (req, res) => {
  res.send(db['app-groups'])
})

server.get('/api/account', (req, res) => {
  res.send(db['account'])
})

server.put('/api/app-groups', (req, res, next) => {
  const id = (Math.random() + 1).toString(36).substring(7)
  req.body.id = id
  req.body.applications = []
  db['app-groups'].push(req.body)
  res.send({ id })
})

server.put('/api/app-groups/:id/applications', (req, res, next) => {
  const id = (Math.random() + 1).toString(36).substring(7)
  req.body.id = id
  req.body.active = true
  db['app-groups'] = db['app-groups'].map(g => g.id === req.params.id ? { ...g, applications: [...g.applications, req.body] } : g)
  res.send({ id })
})

server.listen(8029, () => {
  console.log('JSON Server is running')
})