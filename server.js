let express      = require('express');
let app          = express();
let port         = process.env.PORT || 8080;
let mongoose     = require('mongoose');
let passport     = require('passport');
let flash        = require('connect-flash');
let path         = require('path');
// let cors         = require('cors');

let morgan       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let session      = require('express-session');

mongoose.connect('mongodb://localhost:27017'); //connect

//static files
require('./config/login')(passport);
app.use(express.static(path.join(__dirname, 'public')));

//set up express application
app.use(morgan('dev')); //log requests to console
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'newRedditBestRedditSorta',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Server running on port ' + port);
