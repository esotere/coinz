require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser"); // deprecated used express below
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const axios = require("axios");
const clientID = process.env.Client_ID;
const clientSecret = process.env.Client_Secret;
const path = require("path");
// const cors = require("cors");
const logger = require("morgan");
const routes = require("./controllers/coinzUserControllers.js");
// const initialRoutes = require("./controllers/coinzUserLoginControllers.jsx");
const app = express();
// const userApp = express();
const port = process.env.PORT;
// const port1 = process.env.PORT || 7950;

mongoose.connect("mongodb://localhost/coinzUsers", {useNewUrlParser: true, useUnifiedTopology: true });

// app.use(cors({"origin: 'http://localhost:7776'"}));
app.use(logger("dev"));
app.use(express.urlencoded({extended: false}));     // changed bodyParser to express here and below
app.use(express.json());
app.use(express.raw({type:"application/x-www-form-urlencoded"}));

app.use(express.text({ type:"text/html"}));

app.use(express.json({type: "application/*+json"}));

routes(app);
// require("./controllers/coinzUserControllers.js")(app);
// require("./controllers/coinzUserControllers.js");

// app.use( express.static(path.join(__dirname + "/public/"))); // throws mime error
// app.use(express.static(__dirname + "./public/signIn.html")); // used to serve up sign in page
// userApp.use(initialRoutes);                              // original below marked for use
app.use(express.static(__dirname + "/public/"));         // *for use*
app.use(routes);
// userApp.use(initialRoutes);
app.use("/", routes)


app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});

// userApp.listen(port1, () => {
//     console.log(`App listening on port: ${port1}`);
// });