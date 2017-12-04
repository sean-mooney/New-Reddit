//DEPRECATED FILE
//ONLY INCLUDED FOR REFERENCE WHEN WORKING ON OTHER FEATURES
//PRIOR TO MIGRATING THIS CODE TO SERVER.JS FILE

//DO NOT EDIT FOR LIVE USE

//import modules
let express = require('express');
let mongoose = require('mongoose');
let bodyparser = require('body-parser');
let cors = require('cors');
let path = require('path');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');
let app = express();

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

//morgan
app.use(morgan('dev')); //log requests to the console

//cookie parser
app.use(cookieParser());

// required for passport
app.use(session({
  secret: 'newRedditBestRedditSorta',
  resave: true,
  saveUninitialized: true
}));

// session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
// app.use('/', route);
require('./routes/route')(app, passport);

//passport
// app.use(require('serve-static')(__dirname + '/../../public'));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.listen(port,()=>{
  console.log('Server started on port: ' + port);
});
