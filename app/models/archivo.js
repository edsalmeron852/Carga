//Esquema del modelo
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/*
var subSchema = mongoose.Schema({
//your subschema content
},{ _id : false });
 */

var archivoSchema = new Schema({
    sesion: {
        docs: [{
            path: String,
            mimetype: String,
            originalname: String
        }],
        user: String,
        tipo_sesion: String,
        numero_sesion: String,
        fecha_sesion: String,
        fecha: { type: Date, default: Date.now },
        metadatos: String,
        datos_responsable: String,
        datos_enlaceweb: String,
        acuerdos: [{
            user: String,
            fecha_bd: String,
            fecha_acuerdo: String,
            tema: String,
            acuerdos_metadatos: String,
            descripcion_archivo: String,
            titulo: String,
            archivo_acuerdos: [{
                path: String,
                mimetype: String,
                originalname: String
            }],
            datos_responsable: String,
            datos_enlaceWeb: String
        }]
    }
});
//Modelo Archivo
var Archivo = mongoose.model('Archivo', archivoSchema);

module.exports = Archivo;
