const express = require("express");
const router = express.Router();

const taskModel = require("../models/task");

router.get("/tasks/user/:id", async (req, res) => {
  const idUser = req.params.id;
  try {
    if (idUser) {
      const task = await taskModel.getAllTaskByUser({ idUser });
      return res.status(200).json({ task });
    }
    res.status(400).json({ error: "missing send parameters" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const idTask = req.params.id;
  const time = req.body;
  try {
    if (idTask && time) {
      const updated = taskModel.addTimeTracking(idTask, time);
      return res.status(201).json({ updated });
    }
    res.status(400).json({ error: "missing send parameters" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/tasks", async (req, res) => {
  const task = req.body;
  const { idUser, name, description } = task;
  try {
    if (idUser && name && description) {
      const saved = await taskModel.createTask(task);
      console.log(saved);
      if (Object.keys(saved).length > 0)
        return res.status(201).json({ created: "created" });
    }
    res.status(400).json({ error: "missing send parameters" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
