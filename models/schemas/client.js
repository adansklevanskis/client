;(function () {
  'use strict'

  var mongoose = require('mongoose')
  var Schema = mongoose.Schema
  var phoneSchema = require('./phone').phone_schema
  var addressSchema = require('./address').address_schema
  var CPF = require('cpf_cnpj').CPF

  // function to validate if cpf is valid
  function validateCpf (cpf) {
    // accept only number
    if (cpf.replace(/[^0-9]/g, '') !== cpf) return false
    // validate if cpf is valid
    return CPF.isValid(cpf)
  }

  // client model validation
  var clientSchema = new Schema({
    cpf: {
      type: String,
      required: [true, 'Client CPF is required'],
      validate: {
        validator: function (cpf) {
          return validateCpf(cpf)
        },
        message: '{VALUE} is not a valid CPF!'
      }
    },
    name: { type: String, required: [true, 'Client name is required'] },
    email: { type: String, required: [true, 'Client email is required'] },
    maritalStatus: {
      type: String,
      required: [true, 'Marital status is required? Valid status: Married, Single, Divorced'],
      enum: ['Married', 'Single', 'Divorced']
    },
    address: addressSchema,
    phones: [phoneSchema]
  })
  module.exports.client_schema = clientSchema
}())
