angular.module('appPrueba')
    .controller("padreCtrl", ["$scope", "$http", function($scope, $http) {

        $scope.archivos = [];
        $scope.editFiles = [];
        $scope.master = [];
        $scope.finalArray = [];
        $scope.dataFiles = [];
        $scope.editFinalArray = [];
        $scope.exists_equals_data = false;
        $scope.meta = {};
        $scope.meta.desc = [];


        $scope.getArchivos = function() {
            $http.get("/archivos")
                .success(function(data) {
                    $scope.archivos = data;
                })
                .error(function(err) {

                });
        };
        // set obj to delete

        $scope.setDelete = function(obj) {
            $scope.toDelete = obj;
        };
      

        $scope.deleteTodo = function(id) {
            $http.delete('/archivos/' + id._id)
                .success(function(data) {
                    $scope.getArchivos();
                    toastr.success("Contenido Eliminado");
                })
                .error(function(data) {});
        };

        $scope.update = function() {
            $scope.dataFiles = [];

            for (var i = 0; i < $scope.editFiles.length; i++) {
                var file = $scope.editFiles[i];
                var d = file.descripcion.split(",");
                for (var j = 0; j < $scope.editFinalArray.length; j++) {
                    var final_data = $scope.editFinalArray[j];
                    $scope.modify_array_data(d, final_data.data, final_data.new_data);
                }

                $scope.dataFiles
                    .push({
                        _id: file._id,
                        desc: "" + d
                    });
            };


            for (var r = 0; r < $scope.dataFiles.length; r++) {
                var x = {
                    ids: "" + $scope.dataFiles[r]._id,
                    descripcion: "" + $scope.dataFiles[r].desc
                }
                $http({
                    method: 'PUT',
                    url: '/archivos',
                    data: x
                }).then(function successCallback(response) {
                    toastr.success("Contenido Actualizado");
                    $scope.meta.desc = [];
                }, function errorCallback(err) {
                    $scope.getArchivos();
                });
            };
            $scope.getArchivos();

        };

        $scope.mergeArrays = function(file) {
            $scope.editFinalArray = [];

            if ([$scope.master[file._id]] == "true") {
                $scope.editFiles.push(JSON.parse(JSON.stringify(file)));
            } else {
                $scope.removeFromArray($scope.editFiles, file);
            }

            if ($scope.editFiles.length > 0) {
                $scope.finalArray = $scope.editFiles[0].descripcion.split(",");

                for (var i = 1; i < $scope.editFiles.length; i++) {
                    file = $scope.editFiles[i].descripcion.split(",");
                    $scope.finalArray = $scope.merge($scope.finalArray, file);
                }
            } else {
                $scope.finalArray = [];
            }

            $scope.finalArray = $scope.arrayUnique($scope.finalArray);

            for (var i = 0; i < $scope.finalArray.length; i++) {
                $scope.editFinalArray.push({
                    data: $scope.finalArray[i],
                    new_data: $scope.finalArray[i]
                });
            }

            if ($scope.finalArray.length <= 0) {
                $scope.exists_equals_data = false;
            } else {
                $scope.exists_equals_data = true;
            }
        };




        $scope.getIndex = function(obj, isTrue) {

            $scope.meta.ids = "";

            if (isTrue) {
                $scope.meta.desc.push(obj);
            } else {
                var index = $scope.meta.desc.indexOf(obj);
                $scope.meta.desc.splice(index, 1);
            };

            for (var i = 0; i < $scope.meta.desc.length; i++) {
                var xxx = $scope.meta.desc[i].descripcion.split(",");
                $scope.meta.ids = $scope.meta.ids + "" + $scope.meta.desc[i]._id + " "
            };

            $scope.meta.ids = $scope.meta.ids.substring(0, $scope.meta.ids.length - 1)

        };

        $scope.arrayUnique = function(array) {
            var a = array.concat();
            for (var i = 0; i < a.length; ++i) {
                for (var j = i + 1; j < a.length; ++j) {
                    if (a[i] === a[j])
                        a.splice(j--, 1);
                }
            }

            return a;
        };

        $scope.merge = function(parent, child, i) {
            var a = [];
            for (var i = 0; i < child.length; ++i) {
                if (parent.indexOf(child[i]) >= 0)
                    a.push(child[i]);
            }

            return a;
        };

        $scope.removeFromArray = function(arr, data) {
            for (i = 0; i < arr.length; i++) {
                if (arr[i]._id == data._id) {
                    arr.splice(i, 1);
                }
            }
        };

        $scope.modify_array_data = function(parent, data, new_data) {
            for (i = 0; i < parent.length; i++) {
                if (parent[i] == data) {
                    parent[i] = new_data;
                }
            }

            return parent;
        };


        //Show menus
        $scope.MostrarOcultarController = function($scope) {
            $scope.menuState = {}
            $scope.menuState.show = false;
            $scope.cambiarMenu = function() {
                $scope.menuState.show = !$scope.menuState.show;
            };
        }

        //Array of Id's
        $scope.meta = {};
        $scope.meta.desc = [];
        $scope.getIndex = function(obj, isTrue) {
            $scope.meta.ids = "";
            if (isTrue) {
                $scope.meta.desc.push(obj);
            } else {
                var index = $scope.meta.desc.indexOf(obj);
                $scope.meta.desc.splice(index, 1);

            }

            for (var i = 0; i < $scope.meta.desc.length; i++) {
                $scope.meta.ids = $scope.meta.ids + "" + $scope.meta.desc[i]._id + " ";
            }
            $scope.meta.ids = $scope.meta.ids.substring(0, $scope.meta.ids.length - 1);
        };

    }]);
