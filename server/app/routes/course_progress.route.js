module.exports = function(app) {
    const course_progress = require('../controllers/course_progress.controller');
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    router.post("/", course_progress.create);
    router.get("/",course_progress.findAll);
    router.get("/:id", course_progress.findById)
    router.put("/:id", course_progress.update)
    router.delete("/:id",course_progress.deleteById)

    app.use("/api/courseprog", router)
}