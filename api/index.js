
const app = require('./server/index');
const dotenv = require("dotenv");
dotenv.config();


const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log("Backend server is running!");

});

