app.controller('appController',['$scope',function($scope){
    $scope.temp=false;
   // console.log($scope.temp);
    
    $scope.setTemp = function(val){
        $scope.temp=val;
    };
}]);