const router = require("express").Router();
const { getEvents, postEvent , deleteEvent , updateEvent } = require("../controllers/event");

//get all events

router.get("/", getEvents);


//post event

router.post("/" , postEvent );

   
// delete event

router.delete("/:id" , deleteEvent);

//update event

 router.put("/update/:id", updateEvent);



 

  module.exports = router;