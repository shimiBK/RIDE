
const Ride = require("../models/Ride");
const router = require("express").Router();



router.get("/" , async (req,res) => {

    const artist = {...req.query};
    try {
        const Rides = await Ride.find(artist);
  
        
      res.status(200).json(Rides);
    } catch (err) {
      res.status(500).json(err);
    }

   
});


router.delete("/:id", async (req, res) => {
    try {
      const ride = await Ride.findById(req.params.id);
      await ride.deleteOne();
      // if (ride.userID === req.body.uID) {
      //   
      //   res.status(200).json("the post has been deleted");
      // } else {
      //   res.status(403).json("you can delete only your post");
      // }
    } catch (err) {
      res.status(500).json(err);
    }
  });

 

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
    });

    try{
        const savedRide = await newRide.save();
        res.status(201).json('A ride was created Successfully');

    
    }catch(err)
    {
    res.status(500).json(err);
    }
    
    });


module.exports = router;