const router = require("express").Router();
const City = require("../models/Cities");


router.get("/", async (req,res) => {

    try {
        const cities = await City.find();
        res.status(200).json(cities);
        
    } catch (error) {

        res.status(500).json(err);
        
    }

});


module.exports = router;


