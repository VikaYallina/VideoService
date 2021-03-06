const {authJwt} = require('../middleware');
const controller = require('../controllers/user.controller');
const employees = require("../controllers/employee.controller");
module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    })
    app.get("/api/test/all", controller.allAccess);
    app.get(
        "/api/test/emp",
        // [authJwt.verifyToken],
        controller.employeeBoard);

    app.get(
        "/api/test/boss",
        // [authJwt.verifyToken,
        // authJwt.isBoss],
        controller.bossBoard)
    app.get(
        "/app/test/admin",
        // [authJwt.verifyToken,
        // authJwt.isAdmin],
        controller.adminBoard
    )

    app.get(
        "/api/user",
        [authJwt.verifyToken],
        controller.findAll
    )

    app.post(
        "/api/user/:userId/empl/:emplId",
        [authJwt.verifyToken],
        controller.setEmployee
    )


}