var appName = 'appPrueba'
angular.module(appName, ['ngFileUpload','ngMaterial', 'ngMessages'])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    });
