const express = require('express');
const conect = require('./db/config');

const authRouter = require("./routes/auth");

const app = express();
require("dotenv").config();


conect();

app.use(express.json());

app.use("/", express.static(__dirname + "/public"));
app.use("/auth", authRouter);


app.listen(process.env.PORT,()=>{
    console.log(`Aplicacion corriendo en el puerto ${process.env.PORT}`);
})