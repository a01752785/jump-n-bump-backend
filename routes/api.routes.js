const express = require("express");
const JugadorController = require("../controllers/jugador.controller");
const AttemptController = require("../controllers/attempt.controller");
const PlayerCollectibleController = require("../controllers/player.collectible.controller");
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

// Login request
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

// Create a new attempt
router.post("/attempt", function(req, res, next) {
    const attempt = {
        aliasJugador: req.body.alias,
        idNivel: req.body.idNivel,
        puntuacion: req.body.puntuacion,
        vidas: req.body.vidas
    };
    AttemptController.create(attempt).then(() => {
        res.send("OK");
    }).catch(next);
});

// Assign a collectible to a player
router.post("/playercollectible", function(req, res, next) {
    const playerCollectible = {
        aliasJugador: req.body.aliasJugador,
        idColeccionable: req.body.idColeccionable
    };
    PlayerCollectibleController.create(playerCollectible).then(() => {
        res.send("OK");
    }).catch(next);
});

module.exports = router;