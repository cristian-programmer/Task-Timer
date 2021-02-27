const mongoose = require("mongoose");
const config = require("config");

const MONGO_DB_HOST = process.env.NODE_ENV === undefined  ? 
 config.get("MONGO_DB_HOST") : process.env.MONGO_DB_HOST; 

const createConnection = () => {
    mongoose.connect(MONGO_DB_HOST, {
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



