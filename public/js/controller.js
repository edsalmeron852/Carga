angular.module('appPrueba')
    .controller("padreCtrl", ["$scope", "$http", function($scope, $http) {

            $scope.archivos = [];
            $scope.firstName = "";

            $scope.getArchivos = function() {
            $http.get("/archivos")
                .success(function(data) {
                    console.log(data);
                    $scope.archivos = data;
                })
                .error(function(err) {

                });
        };
        // set obj to delete

        $scope.setDelete = function(obj) {
            $scope.toDelete = obj;
            console.log($scope.toDelete);
        };
        /////

        $scope.deleteTodo = function(id) {
            $http.delete('/archivos/' + id._id)
                .success(function(data) {
                    $scope.getArchivos();
                    toastr.success("Contenido Eliminado");
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
        /*$scope.editLesson = function(lesson) {
            console.log("Editando clase", lesson);
            $http({
                method: 'PUT',
                url: '/lessons/' + lesson._id,
                data: lesson
            }).then(function successCallback(response) {

            }, function errorCallback(response) {

            });
        };

        */
        $scope.update = function(obj) {
            for (var j = 0; j < $scope.meta.desc.length; j++) {
                var x = {
                    ids: "" + $scope.meta.desc[j]._id,
                    descripcion: "" + $scope.meta.desc[j].path
                };
                console.log(x);
                $http({
                    method: 'PUT',
                    url: '/archivos',
                    data: x
                }).then(function successCallback(response) {

                },function errorCallback(response) {

                });
            }
            $scope.getArchivos();
            $scope.meta.desc = [];
            $scope.firstName = "";

        };

        //refresh $scope.archivos[data];

        /*  $scope.refresh = function() {
              $http.get('/archivos')
                  .success(function(data) {
                      $scope.archivos = data;
                  });
          };*/

        //Array of Idś
        $scope.meta = {};
        $scope.meta.desc = [];
        $scope.getIndex = function(obj, isTrue) {
            $scope.meta.ids = "";
console.log(obj);
            if (isTrue) {
                $scope.meta.desc.push(obj);
                $scope.firstName = obj.descripcion;
            } else {
                var index = $scope.meta.desc.indexOf(obj);
                $scope.meta.desc.splice(index, 1);

            }
            console.log($scope.meta.desc);

            for (var i = 0; i < $scope.meta.desc.length; i++) {
                $scope.meta.ids = $scope.meta.ids + "" + $scope.meta.desc[i]._id + " ";
            }
            $scope.meta.ids = $scope.meta.ids.substring(0, $scope.meta.ids.length - 1);
                //console.log($scope.meta.ids);
        };


    }]);
