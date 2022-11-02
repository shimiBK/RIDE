const City = require("../models/Cities");



const getCities =  async (req,res,next) => {

    try {
        const cities = await City.find();
        res.status(200).json(cities);
        
    } catch (err) {

      next(err);
        
    }

};

module.exports = { getCities };
