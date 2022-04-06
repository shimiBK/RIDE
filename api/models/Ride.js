const mongoose =require("mongoose");

const RideSchema = new mongoose.Schema(
    {
    eventName:{type:String , required:true},
    firstName:{type:String , required:true},
    lastName:{type:String, required:true},
    city:{type: String , required:true},
    facebook:{type: String , required:true},
    time:{type: String , required:true},

},
{timestamps:true}
);

module.exports = mongoose.model("Ride" , RideSchema);