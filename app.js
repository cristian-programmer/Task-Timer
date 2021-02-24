const express = require('express');
const cookieParser = require('cookie-parser');
const  logger = require('morgan');

const projectController = require('./controllers/project');
const taskController = require('./controllers/task');
const timeTracking = require('./controllers/timeTracking');
const usersController = require('./controllers/users');

const app = express();

const Infraestructure = require("./infraestructure/dynamondb");

Infraestructure.createTable().then(res => {
    console.log("Successfull CreateTables AWS DynamonDB ",res);
}).catch(error => {
    console.error(error);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/project', projectController);
app.use('/task', taskController);
app.use('/timeTracking', timeTracking);
app.use('/users', usersController);


module.exports = app;
