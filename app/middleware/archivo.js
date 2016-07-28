var multer = require('multer');

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

//var middleware_upload = upload.array('files', 9);

var middleware_upload = multer({ storage : storage }).array('files',99);

module.exports = middleware_upload;
