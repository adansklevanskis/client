;(function () {
  'use strict'
  // this unit test business validation with mongo schema
  var assert = require('assert')
  var db = require('./dbTests')
  var clientModel = require('../models/client-model').create(db)
  var ClientService = require('../business/client-service')
  var service = new ClientService(clientModel)

  function tests () {
    var entity = {
      cpf: '08031077657',
      name: 'adans',
      email: 'adans@gmail.com',
      maritalStatus: 'Married',
      address: {
        street: 'Street A number 5 aaaa',
        city: 'Belo Horizonte',
        state: 'MG',
        zipCode: 31310003
      },
      phones: [{
        phoneNumber: 31231234234,
        type: 'Home'
      }]
    }

    describe('Valid Object Client Model', function () {
      it('should save without error', function () {
        service.save(entity, function (err, obj) {
          if (err) done(new Error(obj))
          else
            done()
        })
      })
    })

    describe('Valid Object Client Model', function () {
      it('should save without error', function () {
        service.save(entity, function (err, obj) {
          if (err) done(new Error(obj))
          else
            done()
        })
      })
    })

  }

  module.exports = tests
}())
