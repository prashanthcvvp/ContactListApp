app.controller('registerController',['$http','$scope','$log',function($http,$scope,$log){
    var self =this;
    self.addUser=function(){        
        $http.post('/register',$scope.credential)
        .success(function(res){
            console.log(res);
        }).error(function(){
            $log.error("Error!!");
        });
        $scope.credential="";
        //contactList.push({name:name,email:email,phone:phone});
    };
}]);