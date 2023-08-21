// libraries
const path = require('path')
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// middlewares/
const errorHandling = require('./middlewares/errorHandling');
const Auth = require('./middlewares/authmid');

// router
//const router = require('./router/indexRouter');
//Ghora\router\driverindexRouter.js
const initRouter=require('./router/initpageRouter');
// const driverRouter = require('./router/driverindexRouter');
// const usersRouter=require('./router/userindexRouter');
// app creation
const app = express();

// using libraries
// app.use(fileUpload({ createParentPath : true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root


app.use(morgan('tiny'));

// setting ejs to be view engine
app.set('view engine', 'ejs');

// allow public directory
//app.use(express.static('public'))

//app.set('strict routing', true);
// using router
//app.use(Auth.authDriver);
//app.use('/driver', driverRouter);
app.use('/',initRouter);

// app.use('/driver', driverRouter);
// app.use('/users',usersRouter);


// using error handling middlware
app.use(errorHandling.notFound);
app.use(errorHandling.errorHandler);

module.exports = app;