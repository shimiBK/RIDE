const mongoose =require("mongoose");

const PartnerSchema = new mongoose.Schema(
    {
    festName:{type:String , required:true},    
    firstName:{type:String , required:true},
    lastName:{type:String, required:true},
    city:{type: String , required:true},
    facebook:{type: String , required:true},
    desc:{type: String},
    userID:{type:String, required:true},
    userImg:{type:String},
},
{timestamps:true}
);

module.exports = mongoose.model("Partner" , PartnerSchema);