const router = require("express").Router();
const {getCities} = require("../controllers/cities");

router.get("/", getCities);


module.exports = router;


