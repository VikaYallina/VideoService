const {verifySignUp} = require('../middleware');
const controller = require('../controllers/àuth.controller');
module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    });
    app.post("/api/auth/signup",
    [
        verifySignUp.checkDuplicates,
        verifySignUp.checkRolesExist
    ],
    controller.signup);
    app.post("/api/auth/signin", controller.signin)
}