
const Ride = require("../models/Ride");
const User = require("../models/User")
const router = require("express").Router();


//get rides of specific event

router.get("/" , async (req,res) => {

    const artist = {...req.query};

    console.log(artist);
    try {
        const Rides = await Ride.find(artist);
  
      res.status(200).json(Rides);
    } catch (err) {
      res.status(500).json(err);
    }
   
});

// get rides of specific user

router.get("/user/:userId", async (req,res)=> {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userRides = await Ride.find({userID: currentUser._id});

    res.status(200).json(userRides);

  } catch (error) {
    res.status(500).json(error);
  }
});

//get rides from specific city

router.get("/", async (req,res) =>{

  const cityName = {...req.query};

  try {

    const rides = await Ride.find(cityName)
    res.status(200).json(rides);
    
  } catch (error) {
    res.status(500).json(error);
    
  }


})

//update a ride 

router.put("/update/:id", async (req, res) => {
  try {
    await Ride.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Ride has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
}
);



//delete user's rides


router.delete("/delete/:userId", async (req,res)=>{

  try {
    const currentUser = await User.findById(req.params.userId);
    const userRides = await Ride.find({userID: currentUser._id});


    userRides.map((ride)=>{
       ride.deleteOne();
    })

    res.status(200).json("the rides has been deleted");

    
  } catch (error) {

    res.status(500).json(error);

    
  }


});



// delete specific ride


router.delete("/:id", async (req, res) => {
    try {
      const ride = await Ride.findById(req.params.id);
      await ride.deleteOne();
      res.status(200).json("the ride has been deleted");

    } catch (err) {
      res.status(500).json(err);
    }
  });

  // get specific ride


router.get("/:id", async (req, res) => {

  const path = {...req.query};
  console.log(path)

  try {
    const ride = await Ride.findById(req.params.id);


    res.status(200).json(ride);

  } catch (err) {
    res.status(500).json(err);
  }
});



  //post ride
 

router.post("/" , async (req,res) => {
    
    const newRide = new Ride({
        eventName: req.body.ename,
        firstName: req.body.fname,
        lastName: req.body.lname,
        city: req.body.city,
        facebook: req.body.facebook,
        time:req.body.time,
        userID:req.body.uID,
        userImg:req.body.userImg,
        userGender:req.body.userGender,
    });

    try{
        const savedRide = await newRide.save();
        res.status(201).json(savedRide);

    
    }catch(err)
    {
    res.status(500).json(err);
    }
    
    });


module.exports = router;