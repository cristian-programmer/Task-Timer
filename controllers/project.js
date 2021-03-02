const express = require('express');
const  router = express.Router();

const projectModel = require("../models/project");

router.get("/projects/user/:id", async (req, res) =>{
  const idUser = req.params.id;
  try {
    if(idUser !== ""){
      const projects = await projectModel.getAllProjectByUser({idUser});
      res.status(200).json({projects});
    }else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/projects", async (req, res)=> {
  const {name, description, idUser } = req.body;
  try {
    if(name && description && idUser){
      const saved = await projectModel.createProject({name, description, idUser});
      console.log(saved);
      if(Object.keys(saved).length > 0){
        res.status(201).json({created:"created", id: saved._id});
      }else {
        res.sendStatus(404);
      }

    }else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.patch("/projects/:id/task", async (req, res) => {
  const idProject = req.params.id;
  const {idTask} = req.body;
  try {
    if(idProject && idTask){
      const updated = await projectModel.addTasktoAproject(idProject, idTask);
      console.log("updated ",updated);
      if(updated.nModified > 0)
	return res.status(200).json({updated: "updated"});

    }

    res.status(400).json({error:"missing send parameters"});
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  } 
});

module.exports = router;
