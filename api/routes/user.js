
const User = require("../models/User");
const router = require("express").Router();



//get all users

router.get("/" , async (req,res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch{
        res.status(500).json(err);
    }

})


//get user

router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//upadte user

router.put("/:id", async (req, res) => {
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  );


  module.exports = router;