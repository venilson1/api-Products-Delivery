const express = require('express');
const connectDB = require('./database/Connection');

const app = express();
connectDB();


app.use(express.json());  

const Port = process.env.Port || 3000;
app.listen(Port, () => console.log("Servidor rodando"));