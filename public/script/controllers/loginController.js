app.controller('loginController',['$http','$log','$scope','$location','ContactsList','$rootScope',function($http,$log,$scope,$location,ContactsList,$rootScope){
    var self =this;
    self.invalid=false;   
    $scope.setTemp(false);
    self.validate=function(){
      $http.post('/login',$scope.login)
        .success(function(res){
          if((res.email!==undefined)&&($scope.login.email===res.email)){
              ContactsList.collection=res.collection;
              ContactsList.refresh();
              $location.path('/contacts'); 
          }else{
              $scope.login.password='';
              self.invalid=true;
          }
        }).error(function(){
            $log.error("Error!!");
        });
       
    };
}]);