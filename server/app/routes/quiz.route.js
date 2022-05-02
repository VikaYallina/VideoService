module.exports = function(app) {
    const quiz = require('../controllers/quiz.controller.js');
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    router.post("/",quiz.createQuiz);
    router.get("/",quiz.findAll)
    router.put("/:id", quiz.update)
    router.get("/:id", quiz.findOne)
    router.delete("/:id",quiz.delete)

    app.use("/api/quiz", router)
}