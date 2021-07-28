const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const cors = require("cors");
const logger = require("morgan")
const routes = require("./controllers/coinzUserControllers.js");
// const initialRoutes = require("./controllers/coinzUserLoginControllers.jsx");
const app = express();
// const userApp = express();
const port = process.env.PORT || 7960;
// const port1 = process.env.PORT || 7950;

mongoose.connect("mongodb://localhost/coinzUsers", {useNewUrlParser: true, useUnifiedTopology: true });

// app.use(cors({"origin: 'http://localhost:7776'"}));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.raw({type:"application/x-www-form-urlencoded"}));

app.use(bodyParser.text({ type:"text/html"}));

app.use(bodyParser.json({type: "application/*+json"}));

require("./controllers/coinzUserControllers.js")(app);
// require("./controllers/coinzUserLoginControllers.jsx")(userApp);

// userApp.use(express.static(__dirname + "/public/"));
// userApp.use(initialRoutes);
app.use(express.static(__dirname + "/public/"));
app.use(routes);

// app.get("/", (req,res) => {
//     console.log(req.body);
//         res.status(200).sendFile("./public/signIn.html");
//     });

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});

// userApp.listen(port1, () => {
//     console.log(`App listening on port: ${port1}`);
// });