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
app.use("/api", require("./routes/api.routes"));

// Error handling middleware
app.use(function(err, req, res, next){
    if (typeof err == "string")
        res.status(422).send(err);
    else{
        var errorStr = err.name;
        if (err.name == "SequelizeForeignKeyConstraintError")
            errorStr = errorStr + ":" + err.index;
        res.status(422).send(err.name);
    }
});

// Listen for requests
app.listen(process.env.port || 4000, function() {
    console.log("Now listening for requests");
});