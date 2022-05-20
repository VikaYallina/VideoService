const {authJwt} = require("../middleware");
module.exports = function(app) {
    const department = require('../controllers/department.controller');
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    })

    router.put("/:id/manager/:mId", [authJwt.verifyToken], department.updateManager);
    router.get("/",[authJwt.verifyToken], department.findAll);

    app.use("/api/dep", router)
}