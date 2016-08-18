;(function () {
  'use strict'

  var mongoose = require('mongoose')
  var clientSchema = require('./schemas/client').client_schema
  var Client = mongoose.model('clients', clientSchema)

  // create instance of database for specific client model
  function ClientModel (database) {
    var DataBase = database
    Client.prototype.isValid = function (entity, callback) {
      entity.validate(function (error) {
        if (error) {
          callback(error)
        } else {
          callback(null, entity)
        }
      })
    }
    // overrides key function
    Client.prototype.getKey = function (entity) {
      var cpf = entity['cpf']
      return { cpf: cpf }
    }
    return new DataBase(Client)
  }
  // factory to initialize a instance of Database for ClientModel
  function create (database) {
    return new ClientModel(database)
  }

  module.exports.create = create
}())
