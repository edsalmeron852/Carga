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

//refresh $scope.archivos[data];

$scope.refresh = function(){
    $http.get('/archivos/list')
          .success(function(data){
               $scope.archivos = data;

          });
};

//Array of Idś
var arr=[];

$scope.getIndex = function (id, isTrue) {
            if (isTrue)
                arr.push(id);

            else {
                var index = arr.indexOf(id);
                arr.splice(index, 1);
            }
            console.log(arr);

        };



}])
