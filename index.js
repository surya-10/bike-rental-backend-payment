let express = require("express");
let app = express();
let cors = require("cors");
let port = 8000;
const imagesRouter = require("./routes");
const dbConnection = require("./db");



dbConnection()

app.use(express.json());
app.use(cors());
app.use("/", imagesRouter);



app.listen(port, ()=>{
    console.log("ready");
})