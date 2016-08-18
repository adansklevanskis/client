var router = require('express').Router()

var clientsApi = require('./client-routes')

// register resources
router.use('/', clientsApi)

module.exports = router
