const multer = require('multer');
const { v4: uuidV4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const fileName = `${uuidV4()}.jpg`
        cb(null, fileName) //Appending .jpg
    }
})
const upload = multer({ storage });

module.exports = { upload }