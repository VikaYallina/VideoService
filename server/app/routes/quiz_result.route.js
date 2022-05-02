module.exports = function(app) {
    const quiz_res = require('../controllers/quiz_result.controller');
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    router.post("/", quiz_res.create);
    router.get("/",quiz_res.findAll);
    router.get("/:id", quiz_res.findById)
    router.put("/:id",quiz_res.update)
    router.delete("/:id",quiz_res.deleteById)

    app.use("/api/quizres", router)
}