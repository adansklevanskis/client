;(function () {
  'use strict'

  // specific implementation of tests model
  function DataBase (model) {
    var Model = model
    return {
      findById: function (id, callback) {
        return callback(null, null)
      },
      findAll: function (callback) {
        return callback(null, [])
      },
      save: function (entity, callback) {
        return callback(null, entity)
      },
      update: function (id, entity, callback) {
        return callback(null, entity)
      },
      search: function (entity, callback) {
        return callback(null, entity)
      },
      isValid: function (entity, callback) {
        var entityModel = new Model(entity)
        entityModel.isValid(entityModel, callback)
      },
      remove: function (key, callback) {
        Model.remove(key, callback)
      },
      getKey: function (entity) {
        var entityModel = new Model(entity)
        var id = entityModel.getKey(entity)
        if (id) return id
        // default id config
        id = entity['_id']
        return { _id: id }
      }
    }
  }

  module.exports = DataBase
}())
