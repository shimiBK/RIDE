
const Partner = require("../models/Partner");
const router = require("express").Router();



router.get("/" , async (req,res) => {

    const festival = {...req.query};
    
    try {
        const Partners = await Partner.find(festival);
  
      res.status(200).json(Partners);
    } catch (err) {
      res.status(500).json(err);
    }

   
});

router.delete("/:id", async (req, res) => {
    try {
      const partner = await Partner.findById(req.params.id);
      await partner.deleteOne();
    } catch (err) {
      res.status(500).json(err);
    }
  });

 

router.post("/" , async (req,res) => {
    
    const newPartner = new Partner({
        festName: req.body.festName,
        firstName: req.body.fname,
        lastName: req.body.lname,
        city: req.body.city,
        facebook: req.body.facebook,
        desc:req.body.desc,
        userID:req.body.uID,
        userImg:req.body.userImg,
    });

    try{
        const savedPartner = await newPartner.save();
        res.status(201).json('A Partner post was created Successfully');

    
    }catch(err)
    {
    res.status(500).json(err);
    }
    
    });


module.exports = router;