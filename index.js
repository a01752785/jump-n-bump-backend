const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

// Set up express app
const app = express();

// Set up database connection
db.sequelize.sync();

// JSON parser middleware
app.use(bodyParser.json());

// Initialize routes
app.use("/api", require("./routes/jugador.routes"));

// Error handling middleware
app.use(function(err, req, res, next){
    res.status(422).send(err);
})

// Listen for requests
app.listen(process.env.port || 4000, function() {
    console.log("Now listening for requests");
});