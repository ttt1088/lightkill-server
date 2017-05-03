var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  name: {
      type: String,
      unique: true
  },
  password: String,
  from: {
      type: String,
      default: 'unknown'
  },
  regTime: {
    type: Date,
    default: Date.now()
  },
  bind: {
    type: Boolean,
    default: false
  }
})
//静态方法
userSchema.statics = {
  findById: function (id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}
module.exports = userSchema