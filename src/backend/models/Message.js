const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const uniqueValidator = require('mongoose-unique-validator')
const options = {
  timestamps: true
}

const MessageSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  content: String
}, options)

MessageSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Message', MessageSchema)
