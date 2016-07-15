angular.module('appPrueba')
.controller("padreCtrl", ["$scope", "$http",function($scope,$http) {

$scope.nombre = "Victor";
$scope.archivos = [];
$scope.firstName = "";

$http.get("/archivos")
.success(function (data) {
console.log(data);
$scope.archivos = data;
toastr.success("Bienvenido");
})
.error(function (err) {

});
// set obj to delete
$scope.setDelete=function(obj){
  $scope.toDelete=obj
  console.log($scope.toDelete);
};
/////

$scope.deleteTodo = function(id) {
$http.delete('/archivos/' + id._id)
    .success(function(data) {
        $scope.refresh();
        toastr.success("Contenido Eliminado");
          console.log(data)
          })
  .error(function(data) {
        console.log('Error: ' + data);
          });
};

/*
$scope.editLesson = function(lesson){
console.log("Editando clase", lesson);
$http({
 method: 'PUT',
 url: '/lessons/'+lesson._id,
 data: lesson
}).then(function successCallback(response) {


 }, function errorCallback(response) {

 });
};

*/
$scope.update = function(x) {
console.log(x);
  var x={
    ids : ""+$scope.meta.ids,
    descripcion: ""+x
  }
  $http({
   method: 'PUT',
   url: '/archivos',
   data: x
  }).then(function successCallback(response) {
      toastr.success("Contenido Actualizado");
      $scope.refresh();
      $scope.meta.desc =[];
   }, function errorCallback(err) {
     $scope.refresh();
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
$scope.getIndex = function (obj, isTrue) {
$scope.meta.ids="";

            if (isTrue){
                $scope.meta.desc.push(obj);
                $scope.firstName = obj.descripcion;
            }
            else {
                var index = $scope.meta.desc.indexOf(obj);
                $scope.meta.desc.splice(index, 1);

            };
            
            for(var i=0; i<$scope.meta.desc.length; i++){
                $scope.meta.ids=$scope.meta.ids+""+$scope.meta.desc[i]._id+" "
            };
            $scope.meta.ids=$scope.meta.ids.substring(0,$scope.meta.ids.length-1)
            console.log($scope.meta.ids);
            };


}])
