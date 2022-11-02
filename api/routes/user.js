
const router = require("express").Router();

const { getUsers , getUser , updateUser , deleteUser}
= require("../controllers/user");



//get all users

router.get("/" , getUsers);


//get user

router.get("/:id", getUser);


//upadte user

router.put("/:id", updateUser);

  //delete user

router.delete("/:id", deleteUser);


module.exports = router;