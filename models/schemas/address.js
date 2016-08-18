(function () {
  'use strict'

  var mongoose = require('mongoose')
  var Schema = mongoose.Schema
  // address model validation
  var addressSchema = new Schema({
    street: { type: String, required: [true, 'Street is required'] },
    city: { type: String, required: [true, 'City is required'] },
    state: { type: String, required: [true, 'State is required'] },
    zipCode: { type: Number, required: [true, 'ZipCode is required'] }
  })

  module.exports.address_schema = addressSchema
}())
