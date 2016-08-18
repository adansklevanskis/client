;(function () {
  'use strict'

  // initialize server
  var express = require('express')
  var routes = require('./routes/core-routes')
  var app = express()
  var config = require('config')
  var port = config.get('Server.port')
  require('./middleware/appMiddlware')(app, routes)

  // initialize api
  app.listen(port, function () {
    console.log('Client api running on port ' + port)
  })
}())
