const express = require("express");
const app = express();
const connectDB = require("./database/Connection");
const router = require("./routers");

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

connectDB();

app.use(router);

const Port = process.env.Port || 3000;
app.listen(Port, () => console.log("Servidor rodando porta 3000"));
