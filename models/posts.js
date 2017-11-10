const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
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
  comments:[]
});

const Post = module.exports = mongoose.model('Post', PostSchema);
