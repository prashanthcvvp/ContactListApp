app.service('ContactsList',['$http','$log','filterFilter',function($http,$log,filterFilter){
    var contactList=[];
    var self = this;
    
    self.collection;
    self.refresh=function(){
        $http.get('/contacts/'+self.collection)
            .success(function(response){
                contactList=response;
            })
            .error(function(){
                $log.info("Error");
        });
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
        $log.info("Array = "+ array);
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