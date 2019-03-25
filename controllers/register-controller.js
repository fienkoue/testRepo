var Cryptr = require('cryptr');
var express=require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mric',
  database : 'mydb'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected for register");
} else {
    console.log("Error while connecting with database");
}
});
// cryptr = new Cryptr('myTotalySecretKey');
 
module.exports.register=function(req,res){
    var today = new Date();
  var encryptedString = cryptr.encrypt(req.body.password);
    var users={
        "name":req.body.name,
        "email":req.body.email,
        /*"password":encryptedString*/
        "password":req.body.password,
        "created_at":today,
        "updated_at":today
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });
}

