const mongoose =  require("mongoose");
const {Schema} = mongoose; 

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true}
});

const userModel =  mongoose.model("users", userSchema);

const createUser = async (user) => {
    try {
        const instance = new userModel(user);
        return await instance.save();
    } catch (error) {
        return error;
    }
   
}

const signIn = async (user) => {
    try {
        return await userModel.find(user);
    } catch (error) {
        return error;
    }
    
}

const getUserById = async (idUser) => {
    try {
        return await userModel.findById(idUser);
    } catch (error) {
        return error;
    }
}

const cleanSchemaUser = async() => {
    try {
        return await userModel.deleteMany({});
    } catch (error) {
        return error;
    }
    
}

module.exports = {
    createUser,
    signIn,
    getUserById,
    cleanSchemaUser
};
