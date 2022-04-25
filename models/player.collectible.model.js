module.exports = (sequelize, Sequelize) => {
    const PlayerCollectible = sequelize.define("PlayerCollectible", {
        aliasJugador: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        idColeccionable: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {
        tableName: "Jugador_Coleccionable",
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    return PlayerCollectible;
};