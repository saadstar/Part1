const express = require("express");
const app = express();
const commentRouter = require("./routes/commentRoute");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const cors = require("cors");


connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/comment", commentRouter);

const PORT = 3600 || process.env.PORT;

app.listen((PORT), () => {
    console.log(`connected to server on ${PORT}`);
})