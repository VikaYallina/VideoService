const {authJwt} = require("../middleware");

module.exports = function(app) {
    const question = require("../controllers/question.controller.js");
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    })

    router.get("/", [authJwt.verifyToken],question.findAll)

    app.use("/api/question", router)
}