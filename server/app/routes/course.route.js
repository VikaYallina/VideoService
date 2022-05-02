module.exports = function(app) {
    const course = require('../controllers/course.controller.js');
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    router.post("/", course.create);
    router.get("/",course.findAll);
    router.get("/:id", course.findById)
    router.put("/:id",course.update)

    app.use("/api/course", router)
}