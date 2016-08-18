(function () {
  'use strict'

  var mongoose = require('mongoose')
  var Schema = mongoose.Schema

  // phone model validation
  var phoneSchema = new Schema({
    phoneNumber: { type: Number, required: [true, 'Phone Number is required'] },
    type: {
      type: String,
      required: [true, 'Type is required? Types: Home, Work, Mobile '],
      enum: ['Home', 'Work', 'Mobile']
    }
  })

  module.exports.phone_schema = phoneSchema
}())
