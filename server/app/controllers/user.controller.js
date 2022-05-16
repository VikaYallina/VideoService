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

exports.setEmployee = (req, res) => {
    const userId = req.params.userId;
    const emplId = req.params.emplId;
    User.update({employeeId: emplId}, {where: {id: userId}})
        .then(num => {
            if (num == 1) {
                res.send({message: "Employee updated successfully"})
            } else {
                res.send({
                    message: `Cannot update employee with id=${id}. Maybe employee was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err || `Error updating User with id=${id}`
            });
        })
}