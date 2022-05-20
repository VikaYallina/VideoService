const {authJwt} = require("../middleware");
module.exports = function(app) {
    const quiz_res = require('../controllers/quiz_result.controller');
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    })

    router.post("/",[authJwt.verifyToken], quiz_res.create);
    router.get("/",[authJwt.verifyToken],quiz_res.findAll);
    router.get("/:id",[authJwt.verifyToken], quiz_res.findById)
    router.put("/:id",[authJwt.verifyToken],quiz_res.update)
    router.delete("/:id",[authJwt.verifyToken],quiz_res.deleteById)

    app.use("/api/quizres", router)
}