module.exports = (sequelize, Sequelize) => {
    const Attempt = sequelize.define("Attempt", {
        aliasJugador: {
            type: Sequelize.INTEGER
        },
        idNivel: {
            type: Sequelize.INTEGER
        },
        puntuacion: {
            type: Sequelize.INTEGER
        },
        vidas: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: "Jugador_Nivel",
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    return Attempt;
};