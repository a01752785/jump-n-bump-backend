const db = require("../models");
const Jugador = db.jugador;
const Op = db.Sequelize.Op;

// Create and save a new player
exports.create = async function(jugador) {
    for (var key in jugador) {
        if (typeof jugador[key] == "undefined") {
            throw "UndefinedFieldError";
        }
    }
    
    await Jugador.create(jugador);
    return jugador;
};