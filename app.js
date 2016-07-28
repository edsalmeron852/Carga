var express = require("express");
var mongoose = require("mongoose");
var swig = require("swig");
var async = require("async");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var multer = require('multer');
var config = require('./config');
var gcloud = require('gcloud');
///Petición de Credenciales a config.js
var storage = gcloud.storage({
        projectId: config.projectId,
        keyFilename: config.keyFilename
    });

var bucket = storage.bucket(config.bucketName);


//Multer tratamiento de archivos
var storage	=	multer.diskStorage({
 destination: function (req, file, callback) {
   callback(null, './uploads');
 },
 filename: function (req, file, callback) {
   callback(null, file.fieldname + '-' + Date.now());
 }
});

var middleware_upload = multer({ storage : storage }).array('files',99);



//Conexion mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myapp');
//Esquema del modelo
var archivoSchema = {
        path: String,
        autor: String,
        sesion: String,
        titulo: String,
        subtema: String,
        fecha: { type: Date, default: Date.now },
        mimetype: String,
        originalname: String,
        descripcion: String
    }
    //Modelo Archivo
var Archivo = mongoose.model('Archivo', archivoSchema);

var app = express();

// Configuramos la app para que pueda realizar métodos REST
//Peticiones post  por x-www-form-urlencoded y aplication/json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//Peticiones put y delete
app.use(methodOverride(function(req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method
            delete req.body._method
            return method
        }
    }))
    //Ruta inicio
app.get('/', function(req, res) {
    res.render('index');
});

app.post('/archivos', middleware_upload, function(req, res) {
    async.each(req.files, function(file, callback) {

bucket.upload(file.path, function(err, files) {

  var data = {
      path: "https://"+ config.bucketName + ".storage.googleapis.com/"+files.name,
      mimetype: file.mimetype,
      originalname: file.originalname,
      autor: req.body.autor,
      sesion: req.body.sesion,
      titulo: req.body.titulo,
      subtema: req.body.subtema,
      fecha: req.body.fecha,
      descripcion: req.body.descripcion
  }


  var archivo = new Archivo(data);
  archivo.save(function(err) {
      if (err) return callback(err);
      callback(null);

  });

});


    }, function(err) {
        if (err) console.error(err.message);
        // configs is now a map of JSON data
        res.redirect('/')
    })

});

///Listar archivos
app.get('/archivos', function(req, res) {
    Archivo.find(function(err, archivos) {
        return res.jsonp(archivos);
    });

});
///Editar un archivo
app.get('/archivos/:id', function(req, res) {
    var id = req.params.id;

    Archivo.findOne({
        "_id": id
    }, function(err, archivo) {
        res.render('editar', {
            archivo: archivo
        });
    })

});
//Actualizar Archivos

app.put('/archivos', function(req, res) {

    var data = {
        descripcion: req.body.descripcion
    }
    var ids = req.body.ids.split(" ");

    Archivo.update({"_id": { $in: ids }}, data, { multi: true }, function(err, archivo) {
       //res.status(200).jsonp(archivo);
       res.send("actualizado")
    });
});

app.delete('/archivos/:id', function(req, res) {
    var id = req.params.id;

    Archivo.findOneAndRemove({
        "_id": id
    }, function(err, archivo) {
        return res.jsonp(archivo);
    });

});


// Aqui es donde la magia del template ocurre!
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './app/views');
// Importante desabilitar cache de las plantillas en desarrollo
app.set('view cache', false);
//Para desactivar la caché de la ramita, haga lo siguiente:
swig.setDefaults({
    cache: false
});

app.use(express.static('./public'));
app.listen(8000);
console.log('Servidor escuchando en puerto 8000!!!');
