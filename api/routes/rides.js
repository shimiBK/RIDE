
const Ride = require("../models/Ride");
const router = require("express").Router();



router.get("/" , async (req,res) => {

    const qCategory = {...req.query};
    try {
        const Rides = await Ride.find(qCategory);
  
        
      res.status(200).json(Rides);
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
        time:req.body.time
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