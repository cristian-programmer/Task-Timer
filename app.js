const express = require('express');
const cookieParser = require('cookie-parser');
const  logger = require('morgan');

const mongo = require("./infraestructure/mongoose");
mongo.createConnection();
const projectController = require('./controllers/project');
const taskController = require('./controllers/task');
const usersController = require('./controllers/users');

const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, " +
    "X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
    next();
}

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


/*app.use('/timeTracking', timeTracking);*/
app.use(cors);
app.use('/v1', projectController);
app.use('/v1', taskController);
app.use('/v1', usersController);


module.exports = app;
