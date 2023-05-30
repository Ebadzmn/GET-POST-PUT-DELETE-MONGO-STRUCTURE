const {readdirSync} = require("fs");
const path = require("path");

const express = require('express')
const app = express();
const cors = require('cors')
const helmet = require('helmet')
require("dotenv").config();
const mongoose = require("mongoose");
const router = express.Router();



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(helmet())
app.use(router);


readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`))) 


const port = process.env.PORT  


mongoose.connect(process.env.DATABASE)
.then(()=>{
    app.listen(port,()=>{
        console.log("all ok start")
    })
})
.catch(
    (err) => {
        console.log(err)
    }
)