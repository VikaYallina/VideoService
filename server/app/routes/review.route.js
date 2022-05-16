module.exports = function(app){
    const review = require('../controllers/review.contoller');
    let router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    router.get("/", review.getAll)
    router.post("/",review.create)
    router.put("/:employeeId/:courseId", review.update)
    router.delete("/:employeeId/:courseId", review.delete)

    app.use("/api/review", router)
}