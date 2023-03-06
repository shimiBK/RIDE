const { Server } = require("socket.io");


const corsOptions = {
    origin: "http://localhost:3000"
  }


const io = new Server({
    cors: {
      corsOptions,
      methods: ["GET", "POST"],
    },
  });



  io.on("connection", (socket) => {

    console.log("a user has connected");





  })




  io.listen(5001);
