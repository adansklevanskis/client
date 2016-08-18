;(function () {
  'use strict'

  var ClientRepository = require('../repositories/client-repository')

  function handleEntityError (err) {
    var errMessage = { errors: [] }
    // go through all the errors...
    for (var errName in err.errors) {
      var errFormatted = 'Field ' + err.errors[errName].path + ': ' + err.errors[errName].message
      errMessage.errors.push(errFormatted)
    }
    return errMessage
  }

  // validate client properties
  function validateClient (client, callback) {
    // client is required
    if (!client) {
      callback('Client is required')
      return
    }
    // client phone required
    if (!client.phones || !client.phones.length === 0) {
      callback('Please insert phone number')
      return
    }
    // client phone required
    if (!client.address) {
      callback('Address is required')
      return
    }
    callback(null, client)
  }

  // ClientService
  function ClientService (model) {
    // inject model
    var repository = new ClientRepository(model)
    return {
      findById: function (id, callback) {
        repository.findById(id, callback)
      },
      findAll: function (callback) {
        repository.findAll(callback)
      },
      save: function (client, callback) {
        model.isValid(client, function (error, clientModel) {
          if (error) {
            var errMessage = handleEntityError(error)
            callback(errMessage)
          } else {
            validateClient(client, function (error, client) {
              // return callback error
              if (error) {
                callback(error)
              } else {
                // get key from model
                var key = model.getKey(client)
                // validate if already exists
                repository.findById(key, function (err, entity) {
                  if (err) return callback(err)
                  if (entity) return callback('Client Already exists.')
                  // save client
                  repository.save(clientModel, callback)
                })
              }
            })
          }
        })
      },
      update: function (id, client, callback) {
        model.isValid(client, function (error, clientModel) {
          if (error) {
            callback(error)
          } else {
            validateClient(client, function (error, client) {
              // return callback error
              if (error) {
                callback(error)
              } else {
                // update client
                repository.update(id, client, callback)
              }
            })
          }
        })
      },
      remove: function (id, callback) {
        repository.remove(id, callback)
      }
    }
  }

  module.exports = ClientService
}())
