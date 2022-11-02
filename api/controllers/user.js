const User = require("../models/User");



const getUsers = async (req,res,next) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        next(err);
    }

};


const getUser = async (req, res,next) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      // res.status(500).json(err);
      next(err);
    }
  };


  const updateUser = async (req, res,next) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      next(err);
    }
  };

  const deleteUser = async (req, res,next) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      res.status(200).json("Account has been updated");
    } catch (err) {
      next(err);
    }
  };


  module.exports = { getUsers , getUser , updateUser , deleteUser}
  
