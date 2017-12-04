const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
  username:{
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true
  }
});

UserSchema.methods.generateHash = function(candidatePassword) {
  return bcrypt.hashSync(candidatePassword, bcrypt.genSaltSync(SALT_WORK_FACTOR), null);
};

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = module.exports = mongoose.model('User', UserSchema);
