const mongoose = require("mongoose");

const connectDB =async () => {
    try {
        await mongoose.connect(process.env.MONGOODB_CONNECT);
        console.log("Connected To Database!");
    } catch (err) {
        console.log("Error in Connecting To Database!");
    }
}

module.exports = connectDB;