var express = require('express')
var router = express.Router()
// factory of client model
var db = require('../models/db')
var clientModel = require('../models/client-model').create(db)
var ClientService = require('../business/client-service')
var service = new ClientService(clientModel)

// define the client get api
router.get('/', function (req, res) {
  service.findAll(function (error, clients) {
    // send internal server error
    if (error) res.status(500)
    // send clients collection
    res.status(200).send(clients)
  })
})

router.post('/', function (req, res) {
  service.save(req.body, function (error, client) {
    // send internal server error
    if (error) {
      res.status(400).send(error)
    } else {
      res.location('/clients/' + client.cpf)
      res.status(201).send(client)
    }
  })
})

router.put('/:cpf', function (req, res) {
  var cpf = req.params['cpf']
  var client = { cpf: cpf }
  service.update(client, req.body, function (error, clients) {
    // send internal server error
    if (error) res.status(500)

    res.status(200).send(clients)
  })
})

router.get('/:cpf', function (req, res) {
  var cpf = req.params['cpf']
  var client = { cpf: cpf }

  service.findById(client, function (error, clientModel) {
    // if error return not found
    if (error) res.status(404)
    if (clientModel) res.send(clientModel)
    else res.status(404).send('Client Not Found')
  })
})
router.delete('/:cpf', function (req, res) {
  var cpf = req.params['cpf']
  var client = { cpf: cpf }
  service.remove(client, function (error, clients) {
    // if error return not found
    if (error) res.status(404)
    // send clients collection
    res.status(200).end()
  })
})

module.exports = router
