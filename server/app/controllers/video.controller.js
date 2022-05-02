const db = require('../models')
const VideoData = db.video_data
const multer = require('../utils/multer')
let fs = require('fs')
let ffmpeg_module = require('../utils/ffmpeg_module')
const path = require("path");
const fse = require('fs-extra')


exports.findAll = (req, res) => {
    VideoData.findAll().then(data => res.send(data))
        .catch(err => res.status(500).send({message: err.message || "Error"}))
}

exports.create = async (req, res) => {
    const uuid = require('uuid').v4
    const id = uuid()
    let path = `./uploads/${id}`;
    fse.mkdirsSync(path);
    VideoData.create({
        id: id,
        title: "",
        desc: ""
    }).then(data => res.send(data))
        .catch(err => res.status(500).send({message: err.message || "Error"}))
}

exports.update = async (req, res) => {
    multer.upload.single('video')(req, res, async (err) => {
        if (err) {
            console.log(err)
            res.status(500).send({message: `Error has occurred: ${err}` || 'Error'})
        }else{
            try{
                const id = req.params.id
                const videoPath = `uploads/${id}/${req.body.filename}`;
                let videoData = fs.readFileSync(videoPath)
                //
                // console.log(videoData)

                const ffmpeg = await ffmpeg_module.getFFmpeg()
                const inputFileName = `input-video`;
                const outputFileName = `output-image.png`;
                let outputData = null;

                ffmpeg.FS('writeFile', inputFileName, videoData);

                await ffmpeg.run(
                    '-ss', '00:00:01.000',
                    '-i', inputFileName,
                    '-frames:v', '1',
                    outputFileName
                );

                outputData = ffmpeg.FS('readFile', outputFileName);
                ffmpeg.FS('unlink', inputFileName);
                ffmpeg.FS('unlink', outputFileName)

                fs.writeFileSync(`./uploads/${id}/thumb.png`,Buffer.from(outputData, 'binary'))

                VideoData.update({
                    title: req.body.title,
                    desc: req.body.desc,
                    filename: req.body.filename
                }, {where: {id: id}}).then(data => res.send(data))
                    .catch(err => res.status(500).send({message: err.message || "Error"}))
            }catch (e) {
                console.error(e)
                res.status(500).send({message: e || 'ERROR'})
            }
        }
    })

}


exports.getVideo = async (req, res) => {
    const file = await VideoData.findByPk(req.params.id)
    const videoPath = `uploads/${req.params.id}/${file.filename}`;
    try {
        const videoStat = fs.statSync(videoPath);
        const fileSize = videoStat.size;
        const videoRange = req.headers.range;
        if (videoRange) {
            const parts = videoRange.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(videoPath, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    } catch (e) {
        res.status(500).send({message: e || "Error has occurred while fetching video"})
    }
}

exports.getData = (req, res) => {
    VideoData.findByPk(req.params.id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({message: err.message})
        })
}

exports.getThumbnail = (req, res) => {
    let options = {
        root: path.join(__dirname, '../../uploads')
    };
    res.sendFile(`./${req.params.id}/thumb.png`, options ,function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('Sent: tumbnail');
        }
    });
}

exports.delete = async (req, res) => {
    const id = req.params.id
    try{
        await fse.remove(path.join(__dirname, `../../uploads/${id}`))
        VideoData.destroy({where: {id: id}})
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Video was deleted successfully!"
                    });
                } else {
                    res.status(404).send({
                        message: `Cannot delete Video with id=${id}. Maybe Video was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete video with id=" + id
                });
            });
    }catch (err) {
        console.error(`Error while deleting.`);

    }
}

