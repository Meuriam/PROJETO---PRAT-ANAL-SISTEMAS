const router = require('express').Router();
const multer = require('multer')
const multerS3 = require('multer-s3')
const crypto = require('crypto')
const aws = require('aws-sdk')

const auth = require('../../middlewares/auth')

// Dotenv module configuration
require('dotenv').config()

aws.config.update({
    accessKeyId: process.env.S3_ID,
    secretAccessKey: process.env.S3_SECRET,
    region: 'us-east-1'
});
const s3 = new aws.S3();

const configs = {
    images: {
        dir: "img/",
        mimetypes: ["image/png", "image/jpeg", "image/bmp", "image/webp"]
    },
    documents: {
        dir: "doc/",
        mimetypes: ["application/pdf"]
    }
}

// Multer S3 storage method configuration
const storage = multerS3({
    s3: s3,
    bucket: 'openbook-cdn',
    key: function (req, file, cb) {
        cb(null, file.fullname)
    },
    contentType: function (req, file, cb) {
        cb(null, file.mimetype)
    },
})

// Multer upload route register
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {

        file.newname = `${crypto.randomBytes(15).toString('hex')}.${file.originalname.split('.').pop()}`

        if (configs.images.mimetypes.includes(file.mimetype)) {
            file.fullname = configs.images.dir + file.newname
            return cb(null, true);
        } else if (configs.documents.mimetypes.includes(file.mimetype)) {
            file.fullname = configs.documents.dir + file.newname
            return cb(null, true);
        }

        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"))

    }
}).single('file');


router.post("/", auth, (req, res) => {

    upload(req, res, function (err) {
        if(err){
            if (err.code === 'LIMIT_FILE_SIZE') message = 'Envie um arquivo com menos de 5 MB'
            if (err.code === 'LIMIT_FILE_COUNT') message = 'Envie apenas um arquivo'
            if (err.code === 'LIMIT_UNEXPECTED_FILE') message = 'Envie um arquivo do tipo png/jpg/jpeg/bmp/webp'
            return res.status(422).send({
                message: message
            })
        }
        res.json({
            file: req.file
        })
    })

})

module.exports = router;