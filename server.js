var express=require('express');
var bodyParser=require('body-parser');
var pMongo=require('promised-mongo').compatible();
var passwordHash = require('password-hash');
var fs = require('fs');
var https = require('https');
var http = require('http');

var app= express();

var PORT = 8000;
var HOST = 'localhost';

var options={
    key:fs.readFileSync('public/certs/key.pem'),
    cert: fs.readFileSync('public/certs/key-cert.pem')
};

server = https.createServer(options, app).listen(PORT, HOST);
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());


var DB ='ContactListApp';
var db=pMongo(DB);
var loginCollection = db.collection('login');


 var dbColl = db.collection("prashanth");
    


////////////////////////////////////////////////////////////////////////////////////
// GET ALL CONTACTS ////////////////////////////////////////////////////////////////

app.get('/contacts/:collection',function(req,res){
    console.log('Get Called '+req.params.collection);
    var dbColl = db.collection(req.params.collection);
    dbColl.find().then(function(docs){
        res.json(docs);
    });
});
////////////////////////////////////////////////////////////////////////////////////
// ADD /////////////////////////////////////////////////////////////////////////////

app.post('/contacts/:collection',function(req,res){
    
    var dbColl = db.collection(req.params.collection);
    dbColl.insert(req.body).then(function(doc){
        res.json(doc);
    });
   /* db.contactlist.insert(req.body,function(err,doc){
        res.json(doc);
    })*/
});
////////////////////////////////////////////////////////////////////////////////////
// DELETE //////////////////////////////////////////////////////////////////////////

app.delete('/contacts/:id',function(req,res){
    db.contactlist.remove({_id:mongojs.ObjectId(req.params.id)},function(err,doc){
        res.json(doc);
    });
});

//EDIT///////////////////////////////////////////////////////////////////////////////
app.get('/contacts/:id',function(req,res){
    db.contactlist.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,doc){
        res.json(doc);
    });
});
////////////////////////////////////////////////////////////////////////////////////
// UPDATE /////////////////////////////////////////////////////////////////////////
app.put('/contacts/:id',function(req,res){
    var id = req.params.id;
    db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
                                 update:{$set:{name:req.body.name,email:req.body.email,phone:req.body.phone}}},
                                    function(err,doc){                                    
                                    res.json(doc);
    });
});
////////////////////////////////////////////////////////////////////////////////////
app.post('/register',function(req,res){
    req.body.password = passwordHash.generate(req.body.password);
    req.body.collection = req.body.name;
    loginCollection.insert(req.body).then(function(doc){
        db.createCollection(req.body.collection);
        res.json("success");
    });
    
});
////////////////////////////////////////////////////////////////////////////////////
app.post('/login',function(req,res){
    loginCollection.findOne({email:req.body.email}).then(function(doc){
        if(passwordHash.verify(req.body.password,doc.password)===true){
            res.json(doc);
        }else if(passwordHash.verify(req.body.password,doc.password)===false){
            res.json('Incorrect pasword');
        }
    });
});
console.log('Server listening on %s:%s', HOST, PORT);