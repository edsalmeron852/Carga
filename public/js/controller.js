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

});
// delete a todo after checking it
$scope.deleteTodo = function(id) {
$http.delete('/archivos/delete/' + id)
    .success(function(data) {
        $scope.refresh();
          console.log(data)  
          })
  .error(function(data) {
        console.log('Error: ' + data);
          });
};

//refresh

$scope.refresh = function(){
    $http.get('/archivos/list')
          .success(function(data){
               $scope.archivos = data;

          });
};

}])
