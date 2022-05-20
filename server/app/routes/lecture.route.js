const Lecture = require("../controllers/quiz.controller");
const {authJwt} = require("../middleware");
module.exports = function(app) {
    const lecture = require('../controllers/lecture.controller.js');
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    })

    router.post("/",[authJwt.verifyToken],lecture.create);
    router.get("/",[authJwt.verifyToken],lecture.findAll)
    router.put("/:id",[authJwt.verifyToken], lecture.update)
    router.get("/:id",[authJwt.verifyToken], lecture.findOne)
    router.delete("/:id",[authJwt.verifyToken],lecture.delete)

    app.use("/api/lect", router)
}