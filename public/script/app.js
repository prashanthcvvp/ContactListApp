var app = angular.module('ContactApp',['ngRoute','ngResource']);

app.factory('serverConnect',['$resource',function($resource){
    return $resource('/contacts/:collection');
}]);
app.config(['$routeProvider','$resourceProvider',function($routeProvider,$resourceProvider){
     $resourceProvider.defaults.stripTrailingSlashes = false;
    $routeProvider
        .when('/',{
            templateUrl:'partials/login.html',
            controller:'loginController as login'
        })
        .when('/contacts',{
            templateUrl:'partials/contacts.html',
            controller:'contactsController as contactsCtrl'
        })
        .when('/register',{
            templateUrl:'partials/register.html',
            controller:'registerController as register'
        })
        .otherwise({
            redirectTo:'/'
        });
    
    
}]);