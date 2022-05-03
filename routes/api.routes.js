const express = require("express");
const JugadorController = require("../controllers/jugador.controller");
const AttemptController = require("../controllers/attempt.controller");
const PlayerCollectibleController = require("../controllers/player.collectible.controller");
var router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Player:
 *          type: object
 *          properties:
 *              alias:
 *                  type: string
 *                  description: Alias of the player
 *              fechaNacimiento:
 *                  type: string
 *                  description: Date of birth of the player in AAAA/MM/DD
 *              nombre:
 *                  type: string
 *                  description: First name of the player
 *              apellido:
 *                  type: string
 *                  description: Last name of the player
 *              genero:
 *                  type: string
 *                  description: Gender or the player (Male/Female)
 *              nacionalidad:
 *                  type: string
 *                  description: Nationality of the player
 *              password:
 *                  type: string
 *                  description: Password of the player
 *          required:
 *              - alias
 *              - fechaNacimiento
 *              - nombre
 *              - apellido
 *              - genero
 *              - nacionalidad
 *              - password
 *          example:
 *              alias: jumpnbump
 *              fechaNacimiento: 2002/05/23
 *              nombre: Andrea
 *              apellido: Velazquez
 *              genero: Female
 *              nacionalidad: Peru
 *              password: pass123
 *      User:
 *          type: object
 *          properties:
 *              alias:
 *                  type: string
 *                  description: Alias of the user
 *              password:
 *                  type: string
 *                  description: Password of the user
 *          required:
 *              - alias
 *              - password
 *          example:
 *              alias: jumpnbump
 *              password: pass123
 * 
 *      Attempt:
 *          type: object
 *          properties:
 *              alias:
 *                  type: string
 *                  description: Alias of the user
 *              idNivel:
 *                  type: int
 *                  description: ID of the level
 *              puntuacion:
 *                  type: int
 *                  description: Score obtained
 *              vidas:
 *                  type: int
 *                  description: Lives remaining
 *          required:
 *              - alias
 *              - idNivel
 *              - puntuacion
 *              - vidas
 *          example:
 *              alias: jumpnbump
 *              idNivel: 1
 *              puntuacion: 75
 *              vidas: 2
 *      PlayerCollectible:
 *          type: object
 *          properties:
 *              aliasJugador:
 *                  type: string
 *                  description: Alias of the user
 *              idColeccionable:
 *                  type: int
 *                  description: ID of the collectible
 *          required:
 *              - aliasJugador
 *              - idColeccionable
 *          example:
 *              alias: jumpnbump
 *              idColeccionable: 3
 */

/**
 * @swagger
 * /api/register:
 *  post:
 *      summary: Create a new player
 *      tags: [Player]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Player'
 *      responses:
 *          200:
 *              description: OK
 *          422:
 *              description: Error
 */

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

/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: Authorize a player to login
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Access granted
 *          422:
 *              description: Incorrect password
 */

// Login request
router.post("/login", function(req, res, next) {
    const user = {
        alias: req.body.alias,
        password: req.body.password
    };
    JugadorController.login(user).then((hasAccess) => {
        if (hasAccess) res.send("Access granted");
        else throw "Incorrect password";
    }).catch(next);
});

/**
 * @swagger
 * /api/attempt:
 *  post:
 *      summary: Create a new attempt
 *      tags: [Attempt]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Attempt'
 *      responses:
 *          200:
 *              description: OK
 *          422:
 *              description: Error
 */

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

/**
 * @swagger
 * /api/playercollectible:
 *  post:
 *      summary: Bound a collectible to a player
 *      tags: [PlayerCollectible]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/PlayerCollectible'
 *      responses:
 *          200:
 *              description: OK
 *          422:
 *              description: Error
 */

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