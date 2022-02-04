const db = require('../models');
const Employee = db.employee;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body.firstname){
      req.status(400).send({
          message:"First name cannot be empty"
      })
      return;
  }
  if (!req.body.lastname){
    req.status(400).send({
        message:"Last name cannot be empty"
    })
    return;
  }
  
  const employee = {
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      birthdate: req.body.birthdate
  }

  Employee.create(employee)
    .then(data => {
        res.send(data)
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "An error has occured while creating."
        })
    })
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const lastname = req.query.lastname;
  var condition = lastname ? { lastname: {[Op.iLike]: `%${lastname}%`}} : null;

  Employee.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An error has occured while find all."
        })
    })

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Employee.findByPk(id)
    .then(data => {
        if (data){
            res.send(data);
        }else{
            res.status(404).send({message: `Item with id ${id} was not found`})
        }
    })
    .catch(err => {
        res.status(500).send({message: `Error retrieving item with id ${id}`})
    })
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Employee.update(req.body, {where: { id: id }})
    .then(num => {
        if (num == 1 ){
            res.send({message: "Employee updated successfully"})
        } else{
            res.send({
                message: `Cannot update employee with id=${id}. Maybe employee was not found or req.body is empty!`
              });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating User with id=" + id
          });
    })
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Employee.destroy({
      where: { id: id }
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
};

// Delete all employees from the database.
exports.deleteAll = (req, res) => {
  Employee.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} employees were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all employees."
          });
        });
};

console.log(exports)
