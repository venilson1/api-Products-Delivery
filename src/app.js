const express = require('express');
const connectDB = require('./database/Connection');
const router = require("./routers");

const app = express();

connectDB();

app.use(express.json()); 

app.use("/",router);

const Port = process.env.Port || 3000;
app.listen(Port, () => console.log("Servidor rodando porta 3000"));