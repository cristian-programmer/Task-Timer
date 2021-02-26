const express = require('express');
const cookieParser = require('cookie-parser');
const  logger = require('morgan');

const mongo = require("./infraestructure/mongoose");
mongo.createConnection();
const projectController = require('./controllers/project');
const taskController = require('./controllers/task');
const timeTracking = require('./controllers/timeTracking');
const usersController = require('./controllers/users');



const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


/*app.use('/timeTracking', timeTracking);*/
app.use('/v1', projectController);
app.use('/v1', taskController);
app.use('/v1', usersController);


module.exports = app;
