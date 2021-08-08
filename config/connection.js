const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/coinzUsers", {useNewUrlParser: true});

const db = mongoose.connection;

db.on("error", error => {
    console.log("Database Error: ", error);
});



module.exports = {
    url: "mongodb://localhost:27017/coinzUsers"
};