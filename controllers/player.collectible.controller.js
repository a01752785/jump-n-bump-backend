const db = require("../models");
const PlayerCollectible = db.playerCollectible;
const Op = db.Sequelize.Op;

// Bound a player with a collectible
exports.create = async function(playerCollectible) {
    await PlayerCollectible.create(playerCollectible);
    return playerCollectible;
};