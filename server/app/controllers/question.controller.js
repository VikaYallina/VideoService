const db = require("../models")
const Question = db.question

exports.findAll = (req, res) => {
    Question.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({message: err || "Error has occured."})
        })
}