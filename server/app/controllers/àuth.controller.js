const db = require('../models')
const config = require('../config/auth.config')
const User = db.user;
const Role = db.role;
const Employee = db.employee
const Op = db.Sequelize.Op;

const axios = require('axios')
require('dotenv').config();


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { role } = require('../models');
const {generatePassword} = require("../utils/pssword_gen");

exports.signup = async (req, res) =>{
    const employee = await Employee.create(req.body)

    const password = generatePassword()

    let data = {
        service_id: process.env.EMAIL_SERVICE_ID,
        template_id: process.env.EMAIL_TEMPLATE_ID,
        user_id: process.env.EMAIL_USER_ID,
        accessToken: process.env.EMAIL_ACCESS_TOKEN,
        template_params: {
            'username': 'James',
            'message': `Your password is ${password}`,
            'from_name':'Vika',
            'to_name':`${req.body.lastname} ${req.body.firstname}`,
            'to_mail':req.body.email
        }
    };

    // fetch("https://api.emailjs.com/api/v1.0/email/send", {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // })

    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(password),
        employeeId: employee.id
    })
    .then(user => {
        if (req.body.roles){
            Role.findAll({
                where: { 
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            })
            .then(roles => {
                user.setRoles(roles).then(() => {
                    axios.post("https://api.emailjs.com/api/v1.0/email/send", data)
                        .then(() => res.send(employee))
                        .catch(err => res.status(500).send({message: err.response.data}))

                })
            })
                .catch(err => res.status(500).send({message: err.response.data}))
        }else{
            user.setRoles([1]).then(() => {
                res.send(employee)
            })
                .catch(err => res.status(500).send({message: err.response.data}))
        }
    })
    .catch(err => {
        req.status(500).send({message: err.message})
    })
}


exports.signin = (req, res) =>{
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (!user){
            return res.status(404).send({
                message: "User with this email was not found"
            })
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid credentials"
            })
        }
        var token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400});
        var authorities = [];
        user.getRoles().then(roles => {
            for (let i=0; i< roles.length; i++){
                authorities.push("ROLE_"+roles[i].name.toUpperCase())
            }
            res.status(200).send({
                id: user.id,
                email: user.email,
                roles: authorities,
                accessToken: token,
                employeeId: user.employeeId
            })
        })
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}