const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: String,
  password: String,
  money: Number,
})

const User = model('User', userSchema)

module.exports = User