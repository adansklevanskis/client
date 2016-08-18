// setup global middleware here
;(function () {
  'use strict'
  var config = require('config')
  var connection = config.get('Database.connectionString')
  var bodyParser = require('body-parser')
  var cors = require('cors')
  var mongoose = require('mongoose')

  // Connect to the beerlocker MongoDB
  mongoose.connect(connection)

  // return function with enabled middlewares configuration
  module.exports = function (app, routes) {
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    // register client api routes
    app.use('/api/clients', routes)
    // unregistered route  send not found
    app.use('/*', function (req, res) {
      res.status(404).send('Resource not found!')
    })

    // enable cors for all origin
    app.use(cors)

    // handling errors as internal error
    app.use(function (err, req, res, next) {
      console.error(err.stack)
      res.status(500).send('Internal server error.')
    })
  }
}())
