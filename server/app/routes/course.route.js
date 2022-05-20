const {verifySignUp, authJwt} = require("../middleware");
module.exports = function(app) {
    const course = require('../controllers/course.controller.js');
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    })

    router.post("/",[authJwt.verifyToken], course.create);
    router.get("/",[authJwt.verifyToken],course.findAll);
    router.get("/:id",[authJwt.verifyToken], course.findById)
    router.put("/:id",[authJwt.verifyToken],course.update)

    app.use("/api/course", router)
}