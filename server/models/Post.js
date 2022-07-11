const mongoose = require('mongoose')

const { Schema, model } = mongoose
const mongoose = require('mongoose')

const postSchema = new Schema({
  username: String,
  password: String,
  money: Number,
})

const Post = model('Post', postSchema)

module.exports = Post