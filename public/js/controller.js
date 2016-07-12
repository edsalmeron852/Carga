angular.module('appPrueba')
.controller("padreCtrl", ["$scope", "$http",function($scope,$http) {

$scope.nombre = "Victor";
$scope.archivos = [];

$http.get("/archivos/list")
.success(function (data) {
console.log(data);
$scope.archivos = data;
})
.error(function (err) {

})

}])
