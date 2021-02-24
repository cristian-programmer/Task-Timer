const  express = require('express');
const router = express.Router();

const userModel = require('./../models/users');

const jwt = require('../infraestructure/jwt');


router.post('/users/login', async (req, res) => {
  const user = req.body;
  try {
    if(user.username !== "" && user.password !== ""){
      const logged = await userModel.signIn(user);
      console.log(logged);
      if(Object.keys(logged).length > 0) {
        const token = jwt.createSign(user);
        res.status(200).json({token});
      }else {
        res.json(404);
      }
    }else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});


router.post('/users', async (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  if(newUser != undefined) {
    try {
      const created = await userModel.createUser(newUser);
      if(created != undefined) {
        res.sendStatus(201);
      }else {
        res.sendStatus(404);
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }else {
    res.sendStatus(404);
  }
});

module.exports = router;
