const ffmpeg = require('@ffmpeg/ffmpeg');

const ffmpegInstance = ffmpeg.createFFmpeg({ log: true });
let ffmpegLoadingPromise = ffmpegInstance.load();

async function getFFmpeg() {
    if (ffmpegLoadingPromise) {
        await ffmpegLoadingPromise;
        ffmpegLoadingPromise = undefined;
    }

    return ffmpegInstance;
}


module.exports = {
    getFFmpeg
}