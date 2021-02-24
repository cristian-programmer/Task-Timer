const express = require('express');
const cookieParser = require('cookie-parser');
const  logger = require('morgan');

const projectController = require('./controllers/project');
const taskController = require('./controllers/task');
const timeTracking = require('./controllers/timeTracking');
const usersController = require('./controllers/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/*app.use('/project', projectController);
app.use('/task', taskController);
app.use('/timeTracking', timeTracking);*/
app.use('/v1', usersController);


module.exports = app;
