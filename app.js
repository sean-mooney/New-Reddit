//import modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

mongoose.connect('mongodb://localhost:27017'); //connect
mongoose.connection.on('connected',()=>{
  console.log('connected to database monogdb @ 27017');
});
mongoose.connection.on('error',(err)=>{
  if(err){
    console.log('Error connecting to database: ' + err);
  }
});

//port number
const port = 8080;

//adding middleware
app.use(cors());

//body - parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

//testing server
app.get('/',(req, res) => {
  res.sendFile(__dirname + '/public/index.html'); //
});

app.get('/post/:id',(req, res) => {
  res.sendFile(__dirname + '/public/post.html'); //
});

app.get('/user/:id',(req, res) => {
  res.sendFile(__dirname + '/public/user.html'); //
});

app.listen(port,()=>{
  console.log('Server started on port: ' + port);
});
