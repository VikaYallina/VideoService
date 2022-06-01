const db = require("../models")
const Review = db.review

exports.getAll = (req, res) => {
    // Получить параметры запроса клиента
    let employeeId = req.query.employee
    let courseId = req.query.course
    // Определение условия для фильтрации записей БД
    let condition = {}
    employeeId ? condition["employeeId"] = employeeId : null
    courseId ? condition["courseId"] = courseId : null

    // Вызов метода для поиска записей в таблице reviews
    Review.findAll({
        where: condition,
        // Осуществление Eager Loading сущности Employee
        include: {
            model: db.employee,
            as: "employee"
        }
    })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({message: err || "An error has occurred while fetching data."})
        })
}

exports.getOne = (req, res) => {

}

exports.create = (req, res) => {
    Review.create(req.body)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message: err}))
}

exports.update = (req, res) => {
    const courseId = req.params.courseId
    const employeeId = req.params.employeeId
    Review.update(req.body, {
        where: {
            courseId,
            employeeId
        }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({message: err || "ERROR"})
        })
}

exports.delete = (req, res) => {
    const employeeId = req.params.employeeId
    const courseId = req.params.courseId
    Review.destroy({
        where: {
            employeeId,
            courseId
        }
    })
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