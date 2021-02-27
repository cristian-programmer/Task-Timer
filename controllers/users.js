const  express = require('express');
const router = express.Router();

const userModel = require('./../models/users');
const jwt = require('../infraestructure/jwt');


router.post('/users/login', async (req, res) => {
  const {username, password} = req.body;
  try {
    if(username && password){
      const userLogged = await userModel.signIn({username,password});
      console.log(userLogged.length);
      if(userLogged.length > 0) {
        const token = jwt.createSign({username, password});
        return res.status(200).json({token, id: userLogged[0]._id, login: true});
      }
    }

    res.status(400).json({error: "missing send parameters", login: false});
    
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


router.post('/users', async (req, res) => {
  try {
  const {username, password, email, name} = req.body;
  if(username && password &&  name && email) {
    const created = await userModel.createUser({username, password, name, email});
    if(Object.keys(created).length > 0) return res.status(201).json({created: "created"});
  }
  
  res.status(400).json({error: "missing send parameters"});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
