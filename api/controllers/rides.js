const Ride = require("../models/Ride");
const User = require("../models/User")



const getRides = async (req,res,next) => {

    const artist = {...req.query};

    try {
        const Rides = await Ride.find(artist);
  
      res.status(200).json(Rides);
    } catch (err) {
      next(err);
    }
   
};


const getUserRides = 

async (req,res,next)=> {

    try {
      const currentUser = await User.findById(req.params.userId);
      const userRides = await Ride.find({userID: currentUser._id});

      if(!currentUser){
        return res.status(404).json("User wasn't found");
      }
      if(!userRides){
        return res.status(404).json("User Rides wasn't found");
      }
  
      res.status(200).json(userRides);
  
    } catch (err) {
      next(err);
    }
  };


  const getRideFromCity = async (req,res,next) =>{

    const cityName = {...req.query};
  
    try {
  
      const rides = await Ride.find(cityName)
      res.status(200).json(rides);
      
    } catch (err) {
      next(err);
      
    }
  
  };



  const updateRide = async (req, res,next) => {
    try {
      await Ride.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Ride has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  };


  const deleteUserRides = async (req,res)=>{

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
  };

  const deleteRide = async (req, res) => {
    try {
      const ride = await Ride.findById(req.params.id);
            
        if(!ride){
          return res.status(404).json("Ride not found");
          
        }

        await ride.deleteOne();
        res.status(200).json("the ride has been deleted");

    } catch (err) {
      res.status(500).json(err);
    }
  };


  const getRide = async (req, res) => {
  
    try {
      const ride = await Ride.findById(req.params.id);

      if(!ride){

        return res.status(404).json("ride not found")
      }
  
  
      res.status(200).json(ride);
  
    } catch (err) {
      res.status(500).json(err);
    }
  };



  const postRide = async (req,res) => {

    console.log(req.body);
    
    const newRide = new Ride({
        eventName: req.body.ename,
        firstName: req.body.fname,
        lastName: req.body.lname,
        city: req.body.city,
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
    
    };


    module.exports = {getRides , getUserRides , getRideFromCity , updateRide, deleteUserRides,  deleteRide , getRide , postRide };





  