let express = require("express");
let app = express();
let cors = require("cors");
let dotenv = require("dotenv");
const imagesRouter = require("./routes");
const dbConnection = require("./db");

dotenv.config()
app.use(express.json());
app.use(cors());

dbConnection()

app.use("/", imagesRouter);



app.listen(process.env.port, ()=>{
    console.log("ready");
})