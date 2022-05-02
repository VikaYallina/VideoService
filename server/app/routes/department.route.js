module.exports = function(app) {
    const department = require('../controllers/department.controller');
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    router.put("/:id/manager/:mId", department.updateManager);
    router.get("/",department.findAll);

    app.use("/api/dep", router)
}