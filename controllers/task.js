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
      const updated = await taskModel.addTimeTracking(idTask, time);
      if (updated.n > 0) {
        return res.status(201).json({ updated: "updated" });
      } else {
        return res.status(400).json({ updated: "no-updated" });
      }
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

router.get("/tasks/:ids", async (req, res) => {
  const ids = req.params.ids;
  const idTasks = ids.split(",");
  console.log("ids: ", ids + " idTasks", idTasks);
  let tasks = [];
  try {
    if (idTasks.length > 0) {
      for (let i in idTasks) {
        const task = await taskModel.getTaskById(idTasks[i]);
        tasks.push(task[0]);
      }

      return res.status(200).json(tasks);
    }
    return res.status(400).json({ error: "missing send parameters" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
