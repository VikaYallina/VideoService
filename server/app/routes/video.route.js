const {authJwt} = require("../middleware");
module.exports = function(app) {
    const fs = require('fs')
    const video = require('../controllers/video.controller');
    var router = require('express').Router();

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    })

    router.get("/test",  function (req, res) {
        // Ensure there is a range given for the video
        const range = req.headers.range;
        if (!range) {
            res.status(400).send("Requires Range header");
        }

        // get video stats (about 61MB)
        const videoPath = "app/videos/fuck.mp4";
        const videoSize = fs.statSync("app/videos/fuck.mp4").size;

        // Parse Range
        // Example: "bytes=32324-"
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        // Create headers
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);

        // create video read stream for this particular chunk
        const videoStream = fs.createReadStream(videoPath, { start, end });

        // Stream the video chunk to the client
        videoStream.pipe(res);
    })

    router.get("/",[authJwt.verifyToken], video.findAll)
    router.post("/:id",[authJwt.verifyToken],video.update)
    router.post("/",[authJwt.verifyToken], video.create)
    router.get("/:id/data",[authJwt.verifyToken],video.getData)
    router.get("/:id",[authJwt.verifyToken],video.getVideo)
    router.get("/:id/thumb",[authJwt.verifyToken], video.getThumbnail)
    router.delete("/:id",[authJwt.verifyToken],video.delete)


    app.use("/api/video", router)
}