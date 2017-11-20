const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  body:{
    type: String,
    default: '',
    trim: true
  },
  user:{
    type: String,
    ref: 'User',
  },
  date:{
    type: Date
  },
  upvotes:{
    type: Number
  },
  downvotes:{
    type: Number
  }
});

const Comment = module.exports = mongoose.model('Comment', CommentSchema);
