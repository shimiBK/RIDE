
const router = require("express").Router();

const {getRides , getUserRides , getRideFromCity , updateRide, deleteUserRides,  deleteRide , getRide , postRide } = require("../controllers/rides")


//get rides of specific event

router.get("/" , getRides);

// get rides of specific user

router.get("/user/:userId", getUserRides);

//get rides from specific city


router.get("/", getRideFromCity);

//update a ride 

router.put("/update/:id", updateRide);


//delete user's rides


router.delete("/delete/:userId", deleteUserRides);


// delete specific ride


router.delete("/:id", deleteRide)

  // get specific ride


router.get("/:id", getRide);



  //post ride
 

router.post("/" , postRide);

module.exports = router;