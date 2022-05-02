const multer = require("multer");
const fse = require("fs-extra");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let type = req.params.id;
        let path = `./uploads/${type}`;
        fse.mkdirsSync(path);
        cb(null, path);
    },
    filename: async (req, file, cb) => {
        const name = file.originalname
        cb(null, `${name}`)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }
})

module.exports = { upload }