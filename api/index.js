const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const rideRoute = require("./routes/rides");
const cors = require("cors");


dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DBconnection Successfull!"))
.catch((err) =>{
    console.log(err);

});


//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/rides", rideRoute);


app.listen(8800, () => {
    console.log("Backend server is running!");

});