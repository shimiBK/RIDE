const Event = require("../models/Event");



const getEvents = async (req,res,next) =>{

    try {
        const Events = await Event.find();

        res.status(200).json(Events);

    } catch (err) {

      next(err);
        
    }
};


const postEvent = async (req,res,next) => {
    
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
      next(err);
    }
    
    };

    const deleteEvent = async (req,res,next) =>{


        try {
            const event = await Event.findById(req.params.id);
            await event.deleteOne();
            res.status(200).json("the event has been deleted");
      
          } catch (err) {
            next(err);
          }


    };



    const updateEvent = async (req, res,next) => {
        try {
          await Event.findByIdAndUpdate(req.params.id, {
            $set: req.body,
          });
          res.status(200).json("Event has been updated");
        } catch (err) {
          next(err);
        }
      };
      


      module.exports = { getEvents, postEvent , deleteEvent , updateEvent};



