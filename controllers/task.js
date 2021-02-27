const express =  require('express');
const router = express.Router();

const taskModel = require('../models/task');

router.get("/tasks", async (req, res) => {
    const tasks = await taskModel.getAllTask();
    res.json(tasks);
});

router.get("/tasks/user/:id", async (req, res) => {
    const idUser = req.params.id;
    try {
        if(idUser !== ""){
            const task = await taskModel.getAllTaskByUser({idUser});
            res.status(200).json({task});
        }else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.patch("/tasks/:id", async (req, res) => {
   const idTask = req.params.id;
   res.json({idTask});  
});

router.post("/tasks", async (req, res) => {
   const task = req.body;
   const {idUser, name, description} = task;
   try {
    if(idUser != "" && name != "" && description != ""){
        const saved = await taskModel.createTask(task);
        console.log(saved);
        if(saved) {
            res.sendStatus(201);
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


module.exports =  router;