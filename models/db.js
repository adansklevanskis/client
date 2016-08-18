;(function () {
  'use strict'

  // specific implementation of mongodb
  function DataBase (model) {
    var Model = model
    return {
      findById: function (id, callback) {
        Model.findOne(id, callback)
      },
      findAll: function (callback) {
        Model.find(callback)
      },
      save: function (entity, callback) {
        var entityModel = new Model(entity)
        entityModel.save(callback)
      },
      update: function (id, entity, callback) {
        Model.findOneAndUpdate(id, entity, null, callback)
      },
      search: function (entity, callback) {
        var entityModel = new Model(entity)
        Model.search(entityModel, callback)
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
