const db = require("../models")
const Lecture = db.lecture

exports.create = (req, res) => {
    Lecture.create(req.body)
        .then((l) => {
            res.send(l)
        }).catch((err) => {
        res.status(500).send({
            message: err.message || "An error occurred while creating Lecture."
        })
    });
}

exports.update = (req, res) => {
    const id = req.params.id
    Lecture.update(req.body, {where: {id: id}})
        .then(num => {
            console.log(num)
            if (num[0] === 1) {
                res.send({message: "Lecture updated successfully"})
            } else {
                res.send({
                    message: `Cannot update Lecture with id=${id}. Maybe Lecture was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error updating Lecture with id=${id}`
            });
        })
}

exports.findAll = (req, res) => {
    Lecture.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error has occurred."
            })
        })
}

exports.findOne = (req, res) => {
    Lecture.findByPk(req.params.id)
        .then(data => {
            if (data){
                res.send(data);
            }else{
                res.status(404).send({message: `Lecture with id ${id} was not found`})
            }
        })
        .catch(err => {
            res.status(500).send({message: err || `Error retrieving Lecture with id ${id}`})
        })
}

exports.delete = (req, res) => {
    Lecture.destroy({where: {id: req.params.id}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Lecture was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Lecture with id=${id}. Maybe Lecture was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete employee with id=" + id
            });
        });
}