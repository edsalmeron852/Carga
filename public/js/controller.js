angular.module('appPrueba')
.controller("padreCtrl", ["$scope", "$http",function($scope,$http) {

$scope.nombre = "Victor";
$scope.archivos = [];

$http.get("/archivos")
.success(function (data) {
console.log(data);
$scope.archivos = data;
})
.error(function (err) {

});
// delete a todo after checking it
$scope.deleteTodo = function(id) {
$http.delete('/archivos/' + id)
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
            }
            else {
                var index = $scope.meta.desc.indexOf(obj);
                $scope.meta.desc.splice(index, 1);

            }
            for(var i = 0;i < $scope.meta.desc.length;i++) {
              for(var j = 0;j < $scope.archivos.length;j++) {
                       if($scope.archivos[j] === $scope.meta.desc[i] ){
                            console.log($scope.archivos[j]);
                           $scope.meta.comp.push($scope.archivos[j]);
                        }
                      }
                    }

            };


}])
