const db = require("../models");
const Attempt = db.attempt;
const Op = db.sequelize.Op;

// Create and save new attempt
exports.create = async function(attempt) {
    await Attempt.create(attempt);
    return attempt;
};