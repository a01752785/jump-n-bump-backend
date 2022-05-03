const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

const path = require("path");

// Swagger documentation
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Jump N Bump API",
            version: "1.0.0"
        }
    },
    apis: [`${path.join(__dirname, "./routes/*")}`]
};
// Set up express app
const app = express();

app.use(express.static("public"));

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
        res.status(422).send(errStr);
    }
});

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

// Listen for requests
app.listen(process.env.port || 80, function() {
    console.log("Now listening for requests");
});