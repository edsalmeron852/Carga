var express = require("express");
var mongoose = require('./config/mongoose');
var swig = require("swig");
var async = require("async");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var bucket = require('./app/middleware/bucket');
var middleware_upload = require('./app/middleware/archivo');
var Archivo = require('./app/models/archivo');

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
/*
RUTAS SESIONES
 */
app.post('/archivos/sesiones', middleware_upload, function(req, res) {
    var archivo = new Archivo();
    async.each(req.files, function(file, callback) {
      console.log(req.files);
        bucket.upload(file.path, function(err, files) {
            if (err) return callback(err);
            documents = {
                path: "https://" + bucket.name + ".storage.googleapis.com/" + files.name,
                mimetype: file.mimetype,
                originalname: file.originalname
            }
            archivo.sesion.docs.push(documents)
            callback();
        });
    }, function(err) {
        //  if (err) console.error(err.message);
        // configs is now a map of JSON data
            archivo.sesion.tipo_sesion = req.body.tipo_sesion,
            archivo.sesion.numero_sesion = req.body.numero_sesion,
            archivo.sesion.fecha_sesion = req.body.fecha_sesion,
            archivo.sesion.metadatos = req.body.metadatos,
            archivo.sesion.datos_responsable = req.body.datos_responsable,
            archivo.sesion.datos_enlaceweb = req.body.datos_enlaceweb,
          //  archivo.sesion.acuerdos.push({ acuerdos_metadatos: req.body.acuerdos_metadatos})

        archivo.save(function(err) {
            if (err) return callback(err);
        });
        res.redirect('/');
    })
});
///Listar archivos
app.get('/archivos/sesiones', function(req, res) {
    Archivo.find(function(err, archivos) {
        if(err) return res.status(400).send({message: getErrorMessage(err)});
        return res.jsonp(archivos);
    });
});
///Editar un archivo
app.get('/archivos/sesiones/:id', function(req, res) {
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
app.put('/archivos/sesiones', function(req, res) {
    var data = {
        sesion: req.body
    }
    var ids = req.body.ids.split(" ");
    Archivo.update({
        "_id": {
            $in: ids
        }
    }, {
        $set: {
            'sesion.metadatos': data.sesion.metadatos
        }
    }, {
        multi: true
    }, function(err, archivo) {
        //res.status(200).jsonp(archivo);
        res.send("actualizado")
    });
});
app.delete('/archivos/sesiones/:id', function(req, res) {
    var id = req.params.id;
    Archivo.findOneAndRemove({
        "_id": id
    }, function(err,archivo ) {

      if (err) return res.status(500).send({message: getErrorMessage(err)});
      return res.jsonp(archivo);
      //return res.status(200)
    });
});
/*
RUTAS ACUERDOS
 */

 app.post('/archivos/sesiones/acuerdos',  middleware_upload, function(req, res) {
   console.log("entro");
   var archivo = [];
   async.each(req.files, function(file, callback) {
       bucket.upload(file.path, function(err, files) {
           if (err) return callback(err);
           archivo_acuerdos = {
               path: "https://" + bucket.name + ".storage.googleapis.com/" + files.name,
               mimetype: file.mimetype,
               originalname: file.originalname
           }
           archivo.push(archivo_acuerdos)
           callback();
       });
   }, function(err) {



     var data = {
         acuerdos: req.body
     }

     var ids = req.body.ids.split(" ");
     Archivo.update({
         "_id": {
             $in: ids
         }
     }, {
         $push: {
             'sesion.acuerdos': {
               acuerdos_metadatos: data.acuerdos.acuerdos_metadatos,
               fecha_bd: data.acuerdos.fecha_bd,
               fecha_acuerdo: data.acuerdos.fecha_acuerdo,
               tema: data.acuerdos.tema,
               archivo_acuerdos: archivo,
               descripcion_archivo: data.acuerdos.descripcion_archivo,
               titulo: data.acuerdos.titulo,
               datos_responsable: data.acuerdos.datos_responsable,
               datos_enlaceWeb: data.acuerdos.datos_enlaceWeb

             }
         }
     }, {
         multi: true
     }, function(err, archivo) {
         //res.status(200).jsonp(archivo);
         res.send("actualizado")
     });




})

 });
//Error handling
var getErrorMessage = function(err) {
    if (err === null) {
        return 'No se obtuvo resultado';
    } else if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                return err.errors[errName].message;
        };
    } else {
        return 'Error desconocido del servidor';
    }
};
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
