const mongoose =require("mongoose");

const CitySchema = new mongoose.Schema(
{
    semel_yeshuv: {String},
    name: {String},
    english_name: {String},
    semel_napa:{String},
    shem_napa: {String},
    semel_lishkat_mana: {String},
    lishka: {String},
    semel_moatza_ezorit: {String},
    shem_moaatza: {String},

},
{timestamps:true}
);

module.exports = mongoose.model("City", CitySchema);