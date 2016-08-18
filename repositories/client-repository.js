;(function () {
  'use strict'

  // contract for ClientRepository
  function ClientRepository (db) {
    // inject context model
    var context = db
    return {
      findById: function (id, callback) {
        context.findById(id, callback)
      },
      findAll: function (callback) {
        context.findAll(callback)
      },
      save: function (client, callback) {
        context.save(client, callback)
      },
      update: function (id, client, callback) {
        context.update(id, client, callback)
      },
      remove: function (id, callback) {
        context.remove(id, callback)
      },
      search: function (client, callback) {
        context.search(client, callback)
      }
    }
  }

  module.exports = ClientRepository
}())
