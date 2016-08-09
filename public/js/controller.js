angular.module("appPrueba")
    .controller("padreCtrl", ["$scope", "$http", 'Upload', '$timeout', '$window', function($scope, $http, Upload, $timeout, $window) {
        $scope.archivos = [];
        $scope.editFiles = [];
        $scope.master = [];
        $scope.finalArray = [];
        $scope.dataFiles = [];
        $scope.editFinalArray = [];
        $scope.exists_equals_data = false;
        $scope.meta = {};
        $scope.meta.desc = [];

        //Combo Sesiones
        //$scope.items = [1, 2, 3, 4, 5, 6, 7];
        $scope.selectedItem;
        $scope.getSelectedText = function() {
          console.log($scope.selectedItem.sesion);
          if ($scope.selectedItem !== undefined) {
            return "Sesion seleccionada ";
          } else {
            return "Seleccionar sesion";
          }
        };



        // GET: LISTAR
        $scope.getArchivos = function() {
            $http.get("/archivos")
                .success(function(data) {
                    $scope.archivos = data;
                    console.log(data);
                })
                .error(function(err) {

                });
        };
        // POST: SUBIR ARCHIVOS Y METADATOS **************************************help*************************************
        $scope.uploadFiles = function(files, errFiles) {
            $scope.files = files;
            $scope.errFiles = errFiles;
            angular.forEach(files, function(file) {
                file.upload = Upload.upload({
                    url: '/archivos/sesiones',
                    data: {
                        files: file,
                        user: '' + $scope.user,
                        tipo_sesion: '' + $scope.tipo_sesion,
                        numero_sesion: '' + $scope.numero_sesion,
                        fecha_sesion: '' + $scope.fecha_sesion,
                        metadatos: '' + $scope.metadatos,
                        datos_enlaceweb: '' + $scope.datos_enlaceweb,
                        datos_responsable: '' + $scope.datos_responsable
                    }
                });
                file.upload.then(function(response) {
                    $timeout(function() {
                        file.result = response.data;
                        console.log(file.result);
                        $window.location.href = "/"
                    });
                }, function(response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            });
        };
        // SET: ESTABLECER OBJETO POR BORRAR
        $scope.setDelete = function(obj) {
            $scope.toDelete = obj;
        };
        // DELETE: ELIMINAR OBJETO
        $scope.deleteTodo = function(id) {
            $http.delete('/archivos/sesiones/' + id._id)
                .success(function(data) {
                    $scope.getArchivos();
                    toastr.success("Contenido Eliminado");
                })
                .error(function(data) {});
        };

        /*
        ACUERDOS
         */
         // POST: SUBIR ACUERDOS Y METADATOS **************************************help*************************************
         $scope.uploadFiles = function(files, errFiles) {
             $scope.files = files;
             $scope.errFiles = errFiles;
             angular.forEach(files, function(file) {
                 file.upload = Upload.upload({
                     url: '/archivos/sesiones/acuerdos',
                     data: {
                         files: file,
                         ids: '' + $scope.ids,
                         fecha_acuerdo: '' + $scope.fecha_acuerdo,
                         nombre_sesion: '' + $scope.nombre_sesion,
                         numero_sesion: '' + $scope.numero_sesion,
                         tema: '' + $scope.tema,
                         acuerdos_metadatos: '' + $scope.acuerdos_metadatos,
                         descripcion_archivo: '' + $scope.descripcion_archivo,
                         titulo: '' + $scope.titulo,
                         archivo_acuerdos: '' + $scope.archivo_acuerdos,
                         datos_responsable: '' + $scope.datos_responsable,
                         datos_enlaceWeb: '' + $scope.datos_enlaceWeb
                     }
                 });
                 file.upload.then(function(response) {
                     $timeout(function() {
                         file.result = response.data;
                         console.log(file.result);
                         $window.location.href = "/"
                     });
                 }, function(response) {
                     if (response.status > 0)
                         $scope.errorMsg = response.status + ': ' + response.data;
                 }, function(evt) {
                     file.progress = Math.min(100, parseInt(100.0 *
                         evt.loaded / evt.total));
                 });
             });
         };

    }]);
