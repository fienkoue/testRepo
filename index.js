var express = require("express");
var bodyParser = require('body-parser');

var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'mric',
   database: 'mydb'
});
connection.connect(function (err) {
   if (!err) {
      console.log("Database is connected for index");
   } else {
      console.log("Error while connecting with database");
   }
});
var app = express();

var path = __dirname + '/views/';

var urlencodedparser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*Pour rechercher les fichiers statiques notamment les fichiers js*/
app.use(express.static('files'));
app.get('/register', function (req, res) {
   res.sendFile(path + "index.html");
})

app.get('/start', function (req, res) {

   res.sendFile(path + "formGestion.html");
})
app.get('/saisiV', function (req, res) {

   res.sendFile(path + "saisieVehicule.html");
})
app.get('/veh', function (req, res) {

   res.sendFile(path + "vehicule.html");
})
app.get('/biens', function (req, res) {

   res.sendFile(path + "biens.html");
});
app.get('/infoLoc', function (req, res) {

   res.sendFile(path + "saisieLoc.html");
});
app.get('/chifLoc', function (req, res) {

   res.sendFile(path + "saisiChiffrLoc.html");
});
app.get('/recap', function (req, res) {

   res.sendFile(path + "recap.html");
});
app.post('/goToResults', function (req, res) {
   /* test */
   console.log(req.body.benef);
   console.log(req.body.dateDebut);
   response = {
      typeDeBiens: req.body.typeDeBiens,
      tpsPossession: req.body.tpsPossession,
      chargesTotales: req.body.chargesTotales
   };
   console.log(response);

   var prixAchat = req.body.prixAchat,
      benef = req.body.benef,
      prixDeVente = req.body.PrixDeVente,
      chiffreAffaires = req.body.chiffreAffaires,
      benef = req.body.benef,
      dateDebut = req.body.dateDebut,
      dateFin = req.body.dateFin
      ;
   res.send('<h1>Les résultats saisis sont les suivants:</h1>'
      + '<br>' + '<p>benef :</p> ' + benef + '<br>'
      + '<p>Le prix de vente est de :</p>' + prixDeVente +
      '<br>' + '<p>le chiffre D affaires généré est de:</p>' +
      '<br>' + chiffreAffaires +
      '<br>' +
      '<p>La date de fin de l opération est prévue pour</p>' + dateFin +
      '<h2>Les autres valeurs saisies sont les suivantes</h2>'
      + '<br>' + JSON.stringify(response));

   /*res.send('<h1>benef :</h1> '+benef);*/

   /*res.sendFile( path + "results.html" );*/
});
app.post('/recapSaisie', function (req, res) {
   var marque = req.body.marque,
      modele = req.body.modele,
      categorie = req.body.categorie,
      anneeImmat = req.body.anneeImmat,
      paysOrigine = req.body.pays,
      puissance = req.body.puissance,
      prixAchat = req.body.prixachat;

   res.send('<h2>Récapitulatif des infos saisies par user:</h2>'
      + '<br>' + '<p>La marque de votre vehicule est:</p>' + marque + '<br>' +
      '<p>Le modèle que vous avez indiqué est :</p>' + modele + '<br>' +
      '<p>La catégorie de votre véhicule est :</p>' + categorie + '<br>' +
      '<p>L annee d immatriculation de ce vehicule est:</p>' + anneeImmat + '<br>' +
      '<p>Le véhicule provient de:</p>' + paysOrigine + '<br>' +
      '<p>La puissance développée est de :</p>' + puissance + '<br>' +
      '<p>Le véhicule a été acheté pour la somme de</p>' + prixAchat +
      '<br>'
   )
});
app.post('/saisLoc', function (req, res) {
   var numloc = req.body.numloc,
      dateDeb = req.body.dateDeb,
      dateFin = req.body.dateFin,
      output=req.body.output,
      prixLoc = req.body.prixLoc;

   res.send('<html>'
      + '<head>' +
      '<meta charset="UTF-8">' + '<title>Recap Infos loc</title>' +
      '<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />' 
       +'<script language="javascript">'+
       'function dateDiff(datefn,datestart) {'+
  
   
   'var dateFin=new Date (datefn.substring(6,10),parseInt(datefn.substring(3,5))-1,datefn.substring(0,2));'+
   'var nDebut=new Date(datestart.substring(6,10),parseInt(datestart.substring(3,5))-1,datestart.substring(0,2)); '+
    
    'var diff=dateFin-nDebut;'+
   
   ' var diff_jour = (diff / (86400000))'+
   
      ' }'+
       
       '</script>'+

      '</head>' + '<body>' +
      '<h1>Les infos de la location sont les suivantes:</h1>'
      + '<br>' + '<p>Le numéro de la location saisi est:</p>' + numloc + '<br>' +
      '<p>La location a débuté le:</p>' + dateDeb + '<br>' +
      '<p>La location s est terminée le:</p>' + dateFin + '<br>' +
      '<p>Le prix de la location a été de:</p>' + prixLoc +
      '<br>'
      + '<p>La différence est de:</p>' +output+
      '<script type="text/javascript" src="file.js">' 
      +
      '</script>'+
      '</body>'
      + '</html>'
   )

});
app.post('/saisChif', function (req, res) {
   var numloc = req.body.numloc,
   prixLoc1 = req.body.prixLoc1,
   prixLoc2 = req.body.prixLoc2,
   prixLoc3 = req.body.prixLoc3,
      output=req.body.output;

   res.send('<html>'
      + '<head>' +
      '<meta charset="UTF-8">' + '<title>Recap Infos loc</title>' +
      '<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />' 
       +'<script language="javascript">'+
              
       '</script>'+

      '</head>' + '<body>' +
      '<h1>Les prix receuillis de la location sont les suivants:</h1>'
      + '<br>' + '<p>Le numéro de la location saisi est:</p>' + numloc + '<br>' +
      '<p>La location n°1 a rapporté:</p>' + prixLoc1 + '<br>' +
      '<p>La location n°2 a rapporté:</p>' + prixLoc2 + '<br>' +
      '<p>La location n°3 a rapporté:</p>' + prixLoc3 +
      '<br>'
      + '<p>Le chiffre d affaires total est de:</p>' +output+
      '<script type="text/javascript" src="file.js">' 
      +
      '</script>'+
      '</body>'
      + '</html>'
   )

});
app.post('/recapInfo', function (req, res) {
   var numloc = req.body.numloc,
   an = req.body.an,
   dateDeb = req.body.dateDeb,
   dateDeb2 = req.body.dateDeb2,
   dateFin = req.body.dateFin,
   dateFin2 = req.body.dateFin2,
   diffdate1= req.body.diffdate1,
   diffdate2= req.body.diffdate2,
      output=req.body.output;

   res.send('<html>'
      + '<head>' +
      '<meta charset="UTF-8">' + '<title>Recap Infos loc</title>' +
      '<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />' 
       +'<script language="javascript">'+
              
       '</script>'+

      '</head>' + '<body>' +
      '<h1>Les infos receuillies de la location sont les suivantes:</h1>'
      + '<br>' + '<p>Le numéro de la location saisi est:</p>' + numloc + '<br>' +
      '<p>L annee de référence  est:</p>' + an + '<br>' +
      '<p>La date de début de location 1 est:</p>' + dateDeb + '<br>' +
      '<p>La date de fin de location 1 est:</p>' + dateFin +
      '<p>La date de début de location 2 est:</p>' + dateDeb2 + '<br>' +
      '<p>La date de fin de location 2 est:</p>' + dateFin2 +
      '<p>La différence de date calculée pour la loc1 est de:</p>' + diffdate1 +
      '<p>La différence de date calculée pour la loc2 est de:</p>' + diffdate2 +
      '<br>'
      + '<p>Le chiffre d affaires total est de:</p>' +output+
      '<script type="text/javascript" src="file.js">' 
      +
      '</script>'+
      '</body>'
      + '</html>'
   )

});
/* route to handle login and registration */
/* 
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
*/
app.listen(8016);

