const User = require('../models/users');
const Post = require('../models/posts');
const Comment = require('../models/comments');


module.exports = function(app, passport) {
  //Get posts
  app.get('/posts', (req, res, next)=>{
    Post.find(function(err, posts){
      res.json(posts);
    })
  });

  //Get a post
  app.get('/post/:id', (req, res, next)=>{
    Post.find(function(err, post){
      res.json(post);
    })
  });

  //Get List of Users
  app.get('/users', (req, res, next)=>{
    User.find(function(err, user){
      res.json(user);
    })
  });

  //Get user
  app.get('/user/:id', (req, res, next)=>{
    User.find(function(err, user){
      res.json(user);
    })
  });

  //Add User
  app.post('/user', (req, res, next)=>{
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
  app.delete('/user/:id',(req, res, next)=>{
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
  app.post('/post',(req, res, next)=>{
    let newPost = new Post({
      title: req.body.title,
      author: req.body.author,
      date: Date.now(),
      upvotes: req.body.upvotes,
      downvotes: req.body.downvotes,
      postBody: req.body.postBody,
      comments: []
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

  //Add comment to post
  app.post('/post/comment',(req, res, next) => {
    Post.findById(req.params.id, function (err, postFound){
      let newComment = new Comment({
        body: req.body.body,
        user: req.body.user,
        // authorID: Schema.ObjectID(),
        date: Date.now(),
        upvotes: req.body.upvotes,
        downvotes: req.body.downvotes
      });

      newComment.save((err, comment) => {
        if (err) {
          res.json({msg: 'Failed to comment'});
        }
        else {
          postFound.comments.push(comment);
          postFound.save();
          res.json({msg: 'Comment submitted succesfully'});
        }
      });
    })
  });

  //Delete post
  app.delete('/post/:id',(req, res, next) => {
    Post.remove({_id: req.params.id}, function(err, result){
      if (err) {
        res.json(err);
      }
      else {
        res.json(result);
      }
    });
  });

  app.get('/',(req, res) => {
    res.sendFile('index.html', { root: 'public'});
  });

  app.get('/login',(req, res) => {
    res.sendFile('login.html', { root: 'public'});
  });

  app.get('/signup',(req, res) => {
    res.sendFile('signup.html', { root: 'public'});
  });

  app.get('/post/:id',(req, res) => {
    res.sendFile('post.html', { root: 'public'});
  });

  app.get('/u/:id',(req, res) => {
    res.sendFile('user.html', { root: 'public'});
  });
}
