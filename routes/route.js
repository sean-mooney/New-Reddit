const express = require('express');
const router = express.Router();

const User = require('../models/users');
const Post = require('../models/posts');

//Get posts
router.get('/posts', (req, res, next)=>{
  Post.find(function(err, posts){
    res.json(posts);
  })
});

//Get List of Users
router.get('/users', (req, res, next)=>{
  User.find(function(err, user){
    res.json(user);
  })
});

//Get user
router.get('/user/:id', (req, res, next)=>{
  User.find(function(err, user){
    res.json(user);
  })
});

//Add User
router.post('/user', (req, res, next)=>{
  let newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save((err, newUser)=>{
    if(err){
      res.json({msg: 'Failed to register user'});
    }
    else {
      res.json({msg: 'User registered successfully'})
    }
  });
});

//Delete user
router.delete('/user/:id',(req, res, next)=>{
  User.remove({_id: req.params.id}, function(err, result){
    if(err){
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
});

//Add post
router.post('/post',(req, res, next)=>{
  let newPost = new Post({
    title: req.body.title,
    author: req.body.author,
    timePosted: Date.now(),
    upvotes: req.body.upvotes,
    downvotes: req.body.upvotes,
    postBody: req.body.postBody,
    comments: [{
      commentBody: req.body.commentBody,
      commentAuthor: req.body.commentAuthor,
      date: Date.now(),
      upvotes: 0,
      downvotes: 0,
    }],
  });

  newPost.save((err, post)=>{
    if(err){
      res.json({msg: 'Failed to submit post'});
    }
    else {
      res.json({msg: 'Posted submitted succesfully'});
    }
  });
});

//Delete post
router.delete('/post/:id',(req, res, next)=>{
  Post.remove({_id: req.params.id}, function(err, result){
    if (err){
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
});



module.exports = router;
