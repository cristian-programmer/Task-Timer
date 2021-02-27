const mongoose = require("mongoose");

const createConnection = () => {
    mongoose.connect("mongodb://172.17.0.2:27017/TaskTimer", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology:true
    }).then(db => {
        console.info("DB connect");
    }).catch(error => {
        console.error(error);
    });
}

const closeConnection = () => {
    mongoose.connection.close();
}

module.exports = {
    createConnection,
    closeConnection
}



