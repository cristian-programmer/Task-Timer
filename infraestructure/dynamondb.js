const credentials = require("./configAWS").configAWS;
const AWS = require("aws-sdk");

AWS.config.update(credentials);
const DynamonDB = new AWS.DynamoDB.DocumentClient();

const createTable = () => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: "users",
            KeySchema: [
                {AttributeName: "idUser", KeyType: "HASH"},
                {AttributeName: "name", KeyType: "RANGE"}
            ],
            AttributeDefinitions: [
                {AttributeName: "idUser", AttributeType: "S"},
                {AttributeName: "name", AttributeType: "S"},
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };
        /*DynamonDB.createTable(params, (error, data) => {
            if(error) return reject(error);
            return resolve(data);
        });*/
    });
}

const getItems = (params) => {
    return new Promise((resolve, reject) => {
        DynamonDB.get(params, (error, data)=> {
            if(error) return reject(error);
            return resolve(data);
        });
    });
} 

const putItem = (params) => {
    return new Promise((resolve ,reject) => {
        DynamonDB.put(params, (error, data) => {
            if(error) return reject(error);
            return resolve(data);
        });
    });
}

const deleteItem = (params) => {
    return new Promise((resolve, reject) => {
        DynamonDB.delete(params, (error, data) => {
            if(error) return reject(error);
            return resolve(data);
        });
    });
}

const query = (params) => {
    return new Promise((resolve, reject) => {
        DynamonDB.query(params, (error, data) => {
            if(error) return reject(error);
            return resolve(data);
        });
    });
}

module.exports = {
    createTable,
    getItems,
    putItem,
    deleteItem,
    query
};