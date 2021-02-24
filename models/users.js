const {v4: uuidv4 } = require('uuid');
const dynamodb = require("./../infraestructure/dynamondb");
const TABLE_NAME = "users";

const createUser = async (newUser) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
             "password": newUser.password,
             "name": newUser.name,
             "username": newUser.username,
             "idUser": uuidv4(),
        }
    };

    try {
        const result = await dynamodb.putItem(params);
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

const signIn = async (user) => {
    /*const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "#pass = :p and #user = :u",
        ExpressionAttributeNames: {
            "#pass": "password",
            "#user": "username"
        },
        ExpressionAttributeValues: {
            ":p": user.password,
            ":u": user.username 
        }
    }*/

    const params = { 
        TableName: TABLE_NAME,
        Key: {
            "password": user.password,
           
        },
        "username": user.username
    }
    try {
        const result =  await dynamodb.getItems(params);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = {
    createUser,
    signIn
};
