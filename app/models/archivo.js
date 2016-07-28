//Esquema del modelo
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var archivoSchema = new Schema({
    path: String,
    autor: String,
    sesion: String,
    titulo: String,
    subtema: String,
    fecha: {
        type: Date,
        default: Date.now
    },
    mimetype: String,
    originalname: String,
    descripcion: String
});
//Modelo Archivo
var Archivo = mongoose.model('Archivo', archivoSchema);

module.exports = Archivo;
