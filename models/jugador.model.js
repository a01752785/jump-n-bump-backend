module.exports = (sequelize, Sequelize) => {
    const Jugador = sequelize.define("Jugador", {
        alias: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        fechaNacimiento: {
            type: Sequelize.DATE
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        genero: {
            type: Sequelize.STRING
        },
        nacionalidad: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    }, {
        tableName: "Jugador",
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    return Jugador;
};