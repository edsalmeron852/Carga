var config = require('./config');
var gcloud = require('gcloud');
///Petición de Credenciales a config.js
var storage = gcloud.storage({
  projectId: config.projectId,
  keyFilename: config.keyFilename
});

var bucket = storage.bucket(config.bucketName);

module.exports = bucket;
