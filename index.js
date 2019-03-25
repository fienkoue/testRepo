var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
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

app.use(session({
   secret: 'secret',
   resave: true,
   saveUninitialized: true
}));

var path = __dirname + '/views/';

var urlencodedparser = bodyParser.urlencoded({ extended: false });
var authenticateController = require('./controllers/authenticate-controller');
var registerController = require('./controllers/register-controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*Pour rechercher les fichiers statiques notamment les fichiers js*/
app.use(express.static('files'));
app.get('/register', function (req, res) {
   res.sendFile(path + "index.html");
})

app.get('/login', function (req, res) {
   res.sendFile(path + "login.html");
})


app.get('/start', function (req, res) {

   res.sendFile(path + "formGestion.html");
})
app.get('/access', function (req, res) {

   res.sendFile(path + "present.html");
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

app.get('/infos', function (req, res) {
   res.sendFile(path + "infos.html");
});
app.get('/paiement', function (req, res) {
   res.sendFile(path + "paiement.html");
});
app.get('/ensLoc', function (req, res) {
   res.sendFile(path + "totalSitLoc.html");
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

app.post('/traitementPaiement', function (req, res) {
   var anneRef = req.body.anneRef,
      selectVeh = req.body.selectVeh,
      periodloc1 = req.body.periodloc1,
      periodloc2 = req.body.periodloc2,
      periodloc3 = req.body.periodloc3,
      numloc1 = req.body.numloc1,
      numloc2 = req.body.numloc2,
      numloc3 = req.body.numloc3,
      montant1 = req.body.montant1,
      montant2 = req.body.montant2,
      montant3 = req.body.montant3,
      output = req.body.output;

   res.send('<h2>Récapitulatif de paiement de l utilisateur :</h2>'
      + '<br>' + '<p>L annee de paiement choisie est:</p>' + anneRef + '<br>' +
      '<p>Le vehicule choisi  est :</p>' + selectVeh + '<br>' +
      '<p>La periode de location1 est :</p>' + periodloc1 + '<br>' +
      '<p>La periode de location2 est :</p>' + periodloc2 + '<br>' +
      '<p>La periode de location3 est :</p>' + periodloc3 + '<br>' +
      '<p>Le numero de location1  est:</p>' + numloc1 + '<br>' +
      '<p>Le numero de location2  est:</p>' + numloc2 + '<br>' +
      '<p>Le numero de location3  est:</p>' + numloc3 + '<br>' +
      '<p>Le montant1 de la location est de :</p>' + montant1 + '<br>' +
      '<p>Le montant2 de la location est de :</p>' + montant2 + '<br>' +
      '<p>Le montant3 de la location est de :</p>' + montant3 + '<br>' +
      '<p>La somme des  locations donne :</p>' + output + '<br>' +
      '<br>'
   )
});
app.post('/totalLoc', function (req, res) {
   var anneRef = req.body.anneRef,
      selectVeh = req.body.selectVeh,
      caouicar = req.body.caouicar,
      cadrivy = req.body.cadrivy,
      output = req.body.output;

   res.send('<h2>Les éléments donne les résultats suivants:</h2>'
      + '<br>' + '<p>L annee de paiement choisie est:</p>' + anneRef + '<br>' +
      '<p>Le vehicule choisi  est :</p>' + selectVeh + '<br>' +
      '<p>Le chiffre d affaires ouicar est :</p>' + caouicar + '<br>' +
      '<p>Le chiffre d affaires drivy est :</p>' + cadrivy + '<br>' +
      '<p>Le montant total des  locations donne :</p>' + output + '<br>' +
      '<br>'
   )
});
app.post('/saisLoc', function (req, res) {
   var numloc = req.body.numloc,
      dateDeb = req.body.dateDeb,
      dateFin = req.body.dateFin,
      output = req.body.output,
      prixLoc = req.body.prixLoc;

   res.send('<html>'
      + '<head>' +
      '<meta charset="UTF-8">' + '<title>Recap Infos loc</title>' +
      '<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />'
      + '<script language="javascript">' +
      'function dateDiff(datefn,datestart) {' +


      'var dateFin=new Date (datefn.substring(6,10),parseInt(datefn.substring(3,5))-1,datefn.substring(0,2));' +
      'var nDebut=new Date(datestart.substring(6,10),parseInt(datestart.substring(3,5))-1,datestart.substring(0,2)); ' +

      'var diff=dateFin-nDebut;' +

      ' var diff_jour = (diff / (86400000))' +

      ' }' +

      '</script>' +

      '</head>' + '<body>' +
      '<h1>Les infos de la location sont les suivantes:</h1>'
      + '<br>' + '<p>Le numéro de la location saisi est:</p>' + numloc + '<br>' +
      '<p>La location a débuté le:</p>' + dateDeb + '<br>' +
      '<p>La location s est terminée le:</p>' + dateFin + '<br>' +
      '<p>Le prix de la location a été de:</p>' + prixLoc +
      '<br>'
      + '<p>La différence est de:</p>' + output +
      '<script type="text/javascript" src="file.js">'
      +
      '</script>' +
      '</body>'
      + '</html>'
   )

});
app.post('/saisChif', function (req, res) {
   var numloc = req.body.numloc,
      prixLoc1 = req.body.prixLoc1,
      prixLoc2 = req.body.prixLoc2,
      prixLoc3 = req.body.prixLoc3,
      output = req.body.output;

   res.send('<html>'
      + '<head>' +
      '<meta charset="UTF-8">' + '<title>Recap Infos loc</title>' +
      '<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />'
      + '<script language="javascript">' +

      '</script>' +

      '</head>' + '<body>' +
      '<h1>Les prix receuillis de la location sont les suivants:</h1>'
      + '<br>' + '<p>Le numéro de la location saisi est:</p>' + numloc + '<br>' +
      '<p>La location n°1 a rapporté:</p>' + prixLoc1 + '<br>' +
      '<p>La location n°2 a rapporté:</p>' + prixLoc2 + '<br>' +
      '<p>La location n°3 a rapporté:</p>' + prixLoc3 +
      '<br>'
      + '<p>Le chiffre d affaires total est de:</p>' + output +
      '<script type="text/javascript" src="file.js">'
      +
      '</script>' +
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
      diffdate1 = req.body.diffdate1,
      diffdate2 = req.body.diffdate2,
      output = req.body.output;

   res.send('<html>'
      + '<head>' +
      '<meta charset="UTF-8">' + '<title>Recap Infos loc</title>' +
      '<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />'
      + '<script language="javascript">' +

      '</script>' +

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
      + '<p>Le chiffre d affaires total est de:</p>' + output +
      '<script type="text/javascript" src="file.js">'
      +
      '</script>' +
      '</body>'
      + '</html>'
   )

});
app.post('/infos', function (req, res) {
   var nom = req.body.nom,
      prenom = req.body.prenom,
      adresse = req.body.adresse,
      codePostal = req.body.codePostal,
      ville = req.body.ville;

   res.send('<html>'
      + '<head>' +
      '<meta charset="UTF-8">' + '<title>Infos saisies par l utilisateur</title>' +
      '<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />'
      + '<script language="javascript">' +
      '</script>' +
      '</head>' + '<body>' +
      '<h1>Vos infos sont les suivantes:</h1>'
      + '<br>' + '<p>Votre nom à l etat civil est:</p>' + nom + '<br>' +
      '<p>Votre 1er prenom est:</p>' + prenom + '<br>' +
      '<p>Vous habitez à l adresse suivante:</p>' + adresse + '<br>' +
      '<p>Le code postal de votre ville est:</p>' + codePostal +
      '<p>Vous habitez dans la ville:</p>' + ville + '<br>' +
      '<script type="text/javascript" src="file.js">'
      +
      '</script>' +
      '</body>'
      + '</html>'
   )

});
console.log(authenticateController);
console.log(registerController);
/* route to handle login and registration*/
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);

app.post('/auth', function (req, resp) {
   var email = req.body.email;
   var password = req.body.password;
   var sql="SELECT * FROM users WHERE email ='"+email+"' and password='"+password+"' ";
   /*var encryptedString = cryptr.encrypt(req.body.password);*/
   console.log(password);
   /*console.log(encryptedString);*/
   if (email && password) {   
      connection.query('SELECT * FROM users WHERE email =? AND password=? ',[email,password], function (error, results, fields) {
         console.log('The solution is: ', results);
         console.log(email);
         if (results.length > 0) {
            req.session.loggedin = true;
            req.session.email = email;
             resp.redirect('/access');
         } else {
            resp.send('Incorrect Username and/or Password!');
         }           
         resp.end();
     });
 } else {
   resp.send('Please enter Username and Password!');
     resp.end();
 }
});
app.get('/logout', function (req, res, next) {
   if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
         if (err) {
            return next(err);
         } else {
            return res.redirect('/login');
         }
      });
   }
});
app.get('/home', function (req, resp) {
   if (req.session.loggedin) {
      resp.send('Welcome back, ' + req.session.email + '!');
   } else {
      resp.send('Please login to view this page!');
   }
   resp.end();
});

app.listen(8016);

