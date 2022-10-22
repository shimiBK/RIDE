const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
{
    eventName:{type:String , required:true},    
    eventValue:{type:String , required:true},
    eventLocation:{type:String, required:true},
    eventVenue:{type:String, required:true},
    eventDate:{type:String, required:true}
},
{timestamps:true}
);

module.exports = mongoose.model("Event", EventSchema);