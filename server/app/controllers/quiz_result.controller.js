const db = require('../models')
const QuizResult = db.quiz_result

exports.create = (req, res) => {
    QuizResult.create(req.body)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message: err}))
}

exports.findAll = (req, res) => {
    let userId = req.query.user
    let quizId = req.query.quiz
    let condition = {}
    userId ? condition["userId"]=userId : null
    quizId ? condition["quizId"]=quizId : null

    QuizResult.findAll({where: condition})
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
}

exports.findById = (req, res) => {
    const id = req.params.id
    QuizResult.findByPk(id)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message: err}))
}

exports.update = (req, res) => {
    const id = req.params.id
    QuizResult.update(req.body, {where: {id:id}})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({message: err || "ERROR"})
        })
}

exports.deleteById = (req, res ) => {
    const id = req.params.id
    QuizResult.destroy({where:{id:id}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "employee was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete employee with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete employee with id=" + id
            });
        });
}