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
    // Сохранение полученного из запроса видео
    // поле upload определяет настройки сохранения (место, имя файла)
    multer.upload.single('video')(req, res, async (err) => {
        if (err) {
            res.status(500).send({message: `Error has occurred: ${err}` || 'Error'})
        } else {
            try {
                // Определение id модели VideoData из тела запроса
                const id = req.params.id
                const videoPath = `uploads/${id}/${req.body.filename}`;
                // Чтение сохраненного видео
                let videoData = fs.readFileSync(videoPath)

                // Создание экземпляра библиотеки ffmpeg
                const ffmpeg = await ffmpeg_module.getFFmpeg()
                const inputFileName = `input-video`;
                const outputFileName = `output-image.png`;
                let outputData = null;

                // Запись файла в оперативную память
                ffmpeg.FS('writeFile', inputFileName, videoData);

                // Получение первого кадра видео
                await ffmpeg.run(
                    '-ss', '00:00:01.000',
                    '-i', inputFileName,
                    '-frames:v', '1',
                    outputFileName
                );

                // Чтение данных полученного изображения из оперативной памяти
                outputData = ffmpeg.FS('readFile', outputFileName);
                // Освобождение памяти от данных
                ffmpeg.FS('unlink', inputFileName);
                ffmpeg.FS('unlink', outputFileName)

                // Запись изображения на жесткий диск
                fs.writeFileSync(`./uploads/${id}/thumb.png`, Buffer.from(outputData, 'binary'))

                // Сохранение новых данных в БД
                VideoData.update({
                    title: req.body.title,
                    desc: req.body.desc,
                    filename: req.body.filename
                }, {where: {id: id}}).then(data => res.send(data))
                    .catch(err => res.status(500).send({message: err.message || "Error"}))
            } catch (e) {
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
                // Из заголовка запроса получаем информацию о начале и конуе отрывка
                const parts = videoRange.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1]
                    ? parseInt(parts[1], 10)
                    : fileSize - 1;
                const chunksize = (end - start) + 1; // Размер отрывка
    
                // Создание потока данных из требуемой части видео
                const file = fs.createReadStream(videoPath, {start, end});
                // Определение заголовков ответа
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'video/mp4',
                };
                // Посылается ответ со статусом 206 - частичный контент
                res.writeHead(206, head);
                // Отправка данных из соданного выше потока
                file.pipe(res);
            } else {
                // В случае, когда файл был доставлен полностью
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
    res.sendFile(`./${req.params.id}/thumb.png`, options, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('Sent: tumbnail');
        }
    });
}

exports.delete = async (req, res) => {
    const id = req.params.id
    try {
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
    } catch (err) {
        console.error(`Error while deleting.`);

    }
}

