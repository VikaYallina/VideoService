const {authJwt} = require("../middleware");
module.exports = function(app) {
    const course_progress = require('../controllers/course_progress.controller');
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    })

    router.post("/",[authJwt.verifyToken], course_progress.create);
    router.get("/",[authJwt.verifyToken],course_progress.findAll);
    router.get("/:id",[authJwt.verifyToken], course_progress.findById)
    router.put("/:id",[authJwt.verifyToken], course_progress.update)
    router.delete("/:id",[authJwt.verifyToken],course_progress.deleteById)

    app.use("/api/courseprog", router)
}