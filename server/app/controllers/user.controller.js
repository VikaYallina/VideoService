exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.employeeBoard = (req, res) => {
    res.status(200).send("Employee Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.bossBoard = (req, res) => {
    res.status(200).send("Boss Content.");
};

const db = require('../models')
const User = db.user

exports.findAll = (req, res) => {
  User.findAll().then(data => res.send(data))
      .catch(err => res.status(500).send(err))
}