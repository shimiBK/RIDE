const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session")
const passport = require("passport");
const rideRoute = require("../routes/rides");
const passportSetup = require("../passport");
const authRoute = require("../routes/auth");
const cityRoute = require("../routes/cities");
const userRoute = require("../routes/user");
const mailRoute = require("../routes/mail");
const eventRoute = require("../routes/event");
const conversationRoute = require("../routes/conversation");
const messageRoute = require("../routes/messages");




const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DBconnection Successfull!"))
.catch((err) =>{
    console.log(err);
});


//middleware
app.use(express.json());
app.use(express.urlencoded({
  extended:true
  }));
app.use(helmet());
app.use(morgan("common"));
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use("/api/rides", rideRoute);
app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
  );
  app.use(passport.session());
  app.use(passport.initialize());
 

app.use("/auth", authRoute);
app.use("/api/cities", cityRoute);
app.use("/api/user", userRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/events", eventRoute);



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

/*----------------------PRODUCTION------------------------*/


app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req,res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


module.exports = app;