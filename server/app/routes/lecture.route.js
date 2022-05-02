const Lecture = require("../controllers/quiz.controller");
module.exports = function(app) {
    const lecture = require('../controllers/lecture.controller.js');
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    router.post("/",lecture.create);
    router.get("/",lecture.findAll)
    router.put("/:id", lecture.update)
    router.get("/:id", lecture.findOne)
    router.delete("/:id",lecture.delete)

    app.use("/api/lect", router)
}