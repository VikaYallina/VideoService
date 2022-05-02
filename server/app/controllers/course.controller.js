const db = require('../models')
const Course = db.course_data

exports.create = (req, res) => {
    Course.create(req.body)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message: err}))
}

exports.findAll = (req, res) => {
    Course.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
}

exports.update = (req, res) => {
    const id = req.params.id
    Course.update(req.body, {where: {id: id}})
        .then(num => {
            console.log(num)
            if (num[0] === 1) {
                res.send({message: "Course updated successfully"})
            } else {
                res.send({
                    message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error updating Course with id=${id}`
            });
        })
}

exports.findById = (req, res) => {
    const id = req.params.id
    Course.findByPk(id)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message: err}))
}