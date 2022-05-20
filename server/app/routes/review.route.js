const {authJwt} = require("../middleware");
module.exports = function(app){
    const review = require('../controllers/review.contoller');
    let router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    })

    router.get("/",[authJwt.verifyToken], review.getAll)
    router.post("/",[authJwt.verifyToken],review.create)
    router.put("/:employeeId/:courseId",[authJwt.verifyToken], review.update)
    router.delete("/:employeeId/:courseId",[authJwt.verifyToken], review.delete)

    app.use("/api/review", router)
}