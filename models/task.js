const mongoose = require("mongoose");
const {Schema} = mongoose;

const TaskSchema = new Schema({
    idUser: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String},
    timeTracking: {
        startDate: { type: Date},
        endingDate: {type: Date} 
    }
});

const taskModel = mongoose.model("task", TaskSchema);
const createTask = async (task) => {
    try {
        
        const taskItem = new taskModel(task);
        return await taskItem.save(task);

    } catch (error) {
        return error;
    }
}

const getAllTaskByUser = async (idUser) => {
    console.log("getAllTaskByUser ",idUser)
    return await taskModel.find(idUser);
}

const getAllTask = async () => {
    return await taskModel.find();
}

module.exports = {
    createTask,
    getAllTaskByUser,
    getAllTask
}