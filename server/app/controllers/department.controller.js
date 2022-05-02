const db = require('../models')
const Department = db.department

exports.findAll = (req, res) => {
    Department.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
}

exports.updateManager = (req, res) => {
    const dId = req.params.id
    const mId = req.params.mId

    Department.update({managerId: mId},{where: {id:dId}})
        .then(num => {
            console.log(num)
            if (num[0] === 1) {
                res.send({message: "Department updated successfully"})
            } else {
                res.send({
                    message: `Cannot update Department with id=${dId}. Maybe Department was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })
}