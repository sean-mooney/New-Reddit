const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    username: String,
  },
  timePosted:{
    type: Date,
    default: Date.now
  },
  upvotes:{
    type: Number,
    required: true
  },
  downvotes:{
    type: Number,
    required: true
  },
  postBody:{
    type: String,
  },
  comments:[{
    commentBody: String,
    commentAuthor: String,
    date: Date,
    upvotes: Number,
    downvotes: Number
  }]
});

const Post = module.exports = mongoose.model('Post', PostSchema);
