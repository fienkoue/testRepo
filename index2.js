var express=require("express");
var bodyParser=require('body-parser');
 
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mric',
  database : 'mydb'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected for index");
} else {
    console.log("Error while connecting with database");
}
});
var app = express();

var path = __dirname + '/views/';
 
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/register', function (req, res) {  
   res.sendFile( path + "index.html" );  
})  
 
app.get('/login', function (req, res) {  
   res.sendFile( path + "login.html" );  
})  
 
/* route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
 
console.log(authenticateController);
console.log(registerController);
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
app.listen(8012);

