const {authJwt} = require('../middleware')
const employees = require("../controllers/employee.controller");

module.exports = function(app) {
    const employees = require('../controllers/employee.controller.js');
    var router = require('express').Router();
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    router.post(
        "/",
        // [authJwt.verifyToken, authJwt.isAdmin],
        employees.create);

    router.get(
        "/" ,
        // [authJwt.verifyToken],
        employees.findAll);

    router.get(
        "/:id",
        // [authJwt.verifyToken],
        employees.findOne);

    router.put("/:id",
        // [authJwt.verifyToken, authJwt.isAdmin],
        employees.update);

    router.delete(
        "/:id",
        // [authJwt.verifyToken, authJwt.isAdmin],
        employees.delete);

    router.delete(
        "/",
        // [authJwt.verifyToken, authJwt.isAdmin],
        employees.deleteAll);

    router.get(
        "/dept/:id",
        employees.findDepartment
    )


    // router.post("/", [authJwt.verifyToken, authJwt.isAdmin], employees.create);
    // router.get("/" [authJwt.verifyToken], employees.findAll);
    // router.get("/:id", [authJwt.verifyToken], employees.findOne);
    // router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin] , employees.update);
    // router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin] , employees.delete);
    // router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], employees.deleteAll);
 
    app.use("/api/employee", router);
}