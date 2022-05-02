const db = require("../models")
const Quiz = db.quiz

exports.createQuiz = (req, res) => {
    Quiz.create({
            title: req.body.title,
            time_limit: req.body.time_limit,
            desc: req.body.desc,
            points_borderline: req.body.points_borderline,
            triesNo: req.body.triesNo,
            questions: req.body.questions ? req.body.questions : []
        }, {
            include: [{
                association: Quiz.question
            }]
        }
    ).then((q) => {
        res.send(q)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "An error occurred while creating Quiz."
        })
    });
}


exports.findAll = (req, res) => {
    Quiz.findAll({
        include: [{
            association: Quiz.question
        }]
    })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send({message: `Error occurred: ${err}`})
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Quiz.findByPk(id, {
        include: [{
            association: Quiz.question
        }]
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({message: `Quiz with id ${id} was not found`})
            }
        })
        .catch(err => {
            res.status(500).send({message: err || `Error retrieving item with id ${id}`})
        })
}

exports.update = async (req, res) => {
    const param_id = req.params.id
    // console.log(Object.getOwnPropertyNames(Quiz.prototype))
    // console.log(Quiz instanceof Model)
    // await Quiz.fillAndSave(req.body)
    //     .then(data => {
    //         res.send(data)
    //     })
    //     .catch(err => {
    //         res.send({message:  err})
    //     })
    // Quiz.update({
    //     time_limit: req.body.time_limit,
    //     title: req.body.title,
    //     desc: req.body.desc,
    //     questions:
    // }, {where: {id: param_id},
    //     include: ["questions"]})

    let mod = await Quiz.findByPk(param_id,
        {include: [{
            association: Quiz.question
        }]})
    mod.fillAndSave(req.body)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            console.log(err)
            res.send({message: err})
        })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Quiz.destroy({where: {id: id}})
        .then(data => {
            if (data === 1){
                res.send({ message: "Quiz deleted successfully"})
            }else {
                res.send({ message: `Could not delete quiz with id=${id}`})
            }
        })
        .catch(err => {
            res.status(500).send({message: err || "Server error occurred"})
        })
}



