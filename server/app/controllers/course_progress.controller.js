const db = require('../models')
const CourseProgression = db.course_progress

exports.create = (req, res) => {
    let body = req.body
    // body = !Array.isArray(body) && [body]
    CourseProgression.bulkCreate(body,{updateOnDuplicate: ["completionRate", "completed", "quiz", "lecture", "video"] })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message: err}))
}

exports.findAll = (req, res) => {
    let emplId = req.query.employee
    let courseId = req.query.course
    let condition = {}
    emplId ? condition["employeeId"]=emplId : null
    courseId ? condition["courseId"]=courseId : null

    CourseProgression.findAll(
        {
            where: condition,
            include:{
                model: db.course_data,
                as:"courseData"
            }
        }
    )
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
}

exports.findById = (req, res) => {
    const id = req.params.id
    CourseProgression.findOne({where:{c_id:id}})
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message: err}))
}

exports.update = (req, res) => {
    const id = req.params.id
    CourseProgression.update(req.body, {where: {c_id:id}})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({message: err || "ERROR"})
        })
}

exports.deleteById = (req, res ) => {
    const id = req.params.id
    CourseProgression.destroy({where:{c_id:id}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Course progression was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Course progression with id=${id}. Maybe Course progression was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Course progression with id=" + id
            });
        });
}