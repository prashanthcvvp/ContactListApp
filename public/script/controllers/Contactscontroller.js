
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