const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  body:{
    type: String,
  },
  author:{
    type: String
  },
  authorID:{
    type: String
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
