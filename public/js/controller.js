angular.module('appPrueba')
.controller("padreCtrl", ["$scope", "$http",function($scope,$http) {

$scope.nombre = "Victor";
$scope.archivos = [];
$scope.firstName = "";

$http.get("/archivos")
.success(function (data) {
console.log(data);
$scope.archivos = data;
})
.error(function (err) {

});
// delete a todo after checking it
$scope.setDelete=function(obj){
  $scope.toDelete=obj
  console.log($scope.toDelete);
};
/////

$scope.deleteTodo = function(id) {
$http.delete('/archivos/' + id._id)
    .success(function(data) {
        $scope.refresh();
          console.log(data)
          })
  .error(function(data) {
        console.log('Error: ' + data);
          });
};

//update


///)
$scope.update = function(obj) {
console.log("aqui" + $scope.firstName);

$http.put('/archivos/' + obj._id,obj)
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
    $http.get('/archivos')
          .success(function(data){
               $scope.archivos = data;
          });
};

//Array of Idś
$scope.meta={};
$scope.meta.desc=[];
$scope.meta.comp=[];
$scope.getIndex = function (obj, isTrue) {


            if (isTrue){
                $scope.meta.desc.push(obj);
                $scope.firstName = obj._id;
            }
            else {
                var index = $scope.meta.desc.indexOf(obj);
                $scope.meta.desc.splice(index, 1);

            }


            };


}])
