const express = require("express");
const JugadorController = require("../controllers/jugador.controller");
var router = express.Router();

// Create a new player
router.post("/register", function(req, res, next) {
    const jugador = {
        alias: req.body.alias,
        fechaNacimiento: req.body.fechaNacimiento,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        genero: req.body.genero,
        nacionalidad: req.body.nacionalidad,
        password: req.body.password
    };
    JugadorController.create(jugador).then(() => {
        res.send("OK");
    }).catch(next);
});

router.post("/login", function(req, res, next) {
    const user = {
        alias: req.body.alias,
        password: req.body.password
    };
    JugadorController.login(user).then((hasAccess) => {
        if (hasAccess) res.send("Access granted");
        else res.send("Incorrect password");
    }).catch(next);
});

module.exports = router;