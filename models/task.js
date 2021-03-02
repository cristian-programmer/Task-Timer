const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  idUser: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  timeTracking: {
    hours: { type: Number },
    minutes: { type: Number },
    seconds: { type: Number },
  },
});

const taskModel = mongoose.model("task", TaskSchema);
const createTask = async (task) => {
  try {
    const taskItem = new taskModel(task);
    return await taskItem.save(task);
  } catch (error) {
    return error;
  }
};

const getAllTaskByUser = async (idUser) => {
  console.log("getAllTaskByUser ", idUser);
  return await taskModel.find(idUser).sort({ createdAt: "asc" });
};

const getAllTask = async () => {
  return await taskModel.find();
};

const addTimeTracking = async (idTask, time) => {
  console.log(time);
  try {
    return await taskModel.updateOne({ _id: idTask }, time);
  } catch (error) {
    return error;
  }
};

const cleanSchemaTask = async () => {
  try {
    return await userModel.deleteMany({});
  } catch (error) {
    return error;
  }
};

module.exports = {
  createTask,
  getAllTaskByUser,
  getAllTask,
  addTimeTracking,
  cleanSchemaTask,
};
