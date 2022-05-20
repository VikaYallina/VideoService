const {authJwt} = require("../middleware");
module.exports = function(app) {
    const quiz = require('../controllers/quiz.controller.js');
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    })

    router.post("/",[authJwt.verifyToken],quiz.createQuiz);
    router.get("/",[authJwt.verifyToken],quiz.findAll)
    router.put("/:id",[authJwt.verifyToken], quiz.update)
    router.get("/:id",[authJwt.verifyToken], quiz.findOne)
    router.delete("/:id",[authJwt.verifyToken],quiz.delete)

    app.use("/api/quiz", router)
}