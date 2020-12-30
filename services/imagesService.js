const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { v4: uuid } = require('uuid');
const s3 = new aws.S3();

const uploadImage = multer({
  storage: multerS3({
    s3,
    bucket: 'gaming-social-network',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, uuid() + path.extname(file.originalname));
    }
  })
});

module.exports = uploadImage;
