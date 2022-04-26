const db = require("../models");
const Jugador = db.jugador;
const Op = db.Sequelize.Op;

// Create and save a new player
exports.create = async function(jugador) {
    for (var key in jugador) {
        if (typeof jugador[key] == "undefined"
            || jugador[key] == "") {
            throw "UndefinedFieldError";
        }
    }
    
    await Jugador.create(jugador);
    return jugador;
};

exports.login = async function(user) {
    try {
        const data = await Jugador.findByPk(user.alias);
        return (user.alias == data.dataValues.alias && user.password == data.dataValues.password);
    }
    catch (error) {
        throw "Alias does not exist";
    }
};