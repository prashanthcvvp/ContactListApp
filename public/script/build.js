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
app.service('ContactsList',['$http','$log','filterFilter','serverConnect','$location',function($http,$log,filterFilter,serverConnect,$location){
    var contactList=[];
    var self = this;
    
    self.collection='';
    self.refresh=function(){
        if(self.collection!=='') {
            serverConnect.query({collection: self.collection}, function (data) {

                contactList = data;
            });
        }else{
            $location.path('/');
        }
        /*$http.get('/contacts/'+self.collection)
            .success(function(response){
                contactList=response;
            })
            .error(function(){
                $log.info("Error");
        });*/
    };
    
    self.addContact=function(contact){
        
        $http.post('/contacts/'+self.collection,contact)
        .success(function(res){
            contactList.push(res);
            //self.refresh();
        }).error(function(){
            $log.error("Error!!");
        });
        //contactList.push({name:name,email:email,phone:phone});
    };
    
    self.getContacts=function(input){
        var array = filterFilter(contactList, input); 
        return array;
    };
    
    self.removeContact=function(id){
        $http.delete('/contacts/'+id).success(function(res){
            refresh();
        }).error(function(){
            $log.error('Error!!!');
        });
    };
    
    self.updateContact=function(contact){
        
        $http.put('/contacts/'+contact._id,contact).success(function(res){
            refresh();
        }).error(function(){
            $log.error("Error !!");
        });
    }
    
}]);

app.controller('contactsController',['ContactsList','$scope','$log','$http','$window',function(ContactsList,$scope,$log,$http,$window){
    var self =this;
    self.contact;
    $scope.setTemp(true);
    ContactsList.refresh();
    self.addContact=function(contact){
        ContactsList.addContact(contact);
        $scope.contact='';
    };
    
    self.getContacts=function(val){
        return ContactsList.getContacts(val);
    }
    
    self.removeContact=function(id){
        ContactsList.removeContact(id);
    };
    
    self.editContact=function(index){
        contacts=ContactsList.getContacts();
        $scope.contact=contacts[index];
        
    };
    
    self.updateContact=function(){
        //console.log(id);
        ContactsList.updateContact($scope.contact);
        $scope.contact='';
    };
    
}]);
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
app.controller('appController',['$scope',function($scope){
    $scope.temp=false;
   // console.log($scope.temp);
    
    $scope.setTemp = function(val){
        $scope.temp=val;
    };
}]);