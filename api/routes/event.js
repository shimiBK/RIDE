const router = require("express").Router();
const Event = require("../models/Event");


//get all events

router.get("/", async (req,res) =>{

    try {
        const Events = await Event.find();

        res.status(200).json(Events);

    } catch (error) {

        res.status(500).json(err);
        
    }
})


//post event

router.post("/" , async (req,res) => {
    
    const newEvent = new Event({
        eventName: req.body.eventName,
        eventValue: req.body.eventTitle,
        eventLocation: req.body.eventLocation,
        eventVenue: req.body.eventVenue,
        eventDate: req.body.eventDate,
    });

    try{
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);

    
    }catch(err)
    {
    res.status(500).json(err);
    }
    
    });

    module.exports = router;


    router.delete("/:id" , async (req,res) =>{


        try {
            const event = await Event.findById(req.params.id);
            await event.deleteOne();
            res.status(200).json("the event has been deleted");
      
          } catch (err) {
            res.status(500).json(err);
          }


    })


    router.put("/update/:id", async (req, res) => {
        try {
          await Event.findByIdAndUpdate(req.params.id, {
            $set: req.body,
          });
          res.status(200).json("Event has been updated");
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      );
      

