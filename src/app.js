const express = require('express');
const app = express();
const connectDB = require('./database/Connection');
const router = require("./routers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use(router);

const Port = process.env.Port || 3000;
app.listen(Port, () => console.log("Servidor rodando porta 3000"));