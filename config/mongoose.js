var config = require('./config');
var mongoose = require("mongoose");

var db = mongoose.connect(config.db, function(err, res) {
    if (err) {
      console.log('ERROR: en conexion a DB. ' + err);
    } else {
      console.log('Conectado a DB myapp');
    }
  });
module.exports = db;
