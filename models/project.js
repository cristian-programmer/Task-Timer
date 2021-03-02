const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  idUser: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  tasks: [String],
});

const projectModel = mongoose.model("projects", projectSchema);

const createProject = async (project) => {
  const projectItem = new projectModel(project);
  return await projectItem.save();
};

const addTasktoAproject = async (idProject, task) => {
  return await projectModel.updateOne(
    { _id: idProject },
    { $push: { tasks: task } }
  );
};

const getAllProjectByUser = async (idUser) => {
  return await projectModel.find(idUser);
};

const cleanSchemaProject = async () => {
  try {
    return await projectModel.deleteMany({});
  } catch (error) {
    return error;
  }
};

module.exports = {
  createProject,
  addTasktoAproject,
  getAllProjectByUser,
  cleanSchemaProject,
};
