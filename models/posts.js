const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  link:{
    type: String,
    required: true
  },
  author:{
    type: String,
  },
  authorID:{
    type: String,
  },
  date:{
    type: Date,
    default: Date.now
  },
  upvotes:{
    type: Number,
  },
  downvotes:{
    type: Number,
  },
  postBody:{
    type: String,
  },
  comments:[{
    body: String,
    user: String,
    date: Date,
    upvotes: Number,
    downvotes: Number
  }]
});

const Post = module.exports = mongoose.model('Post', PostSchema);
