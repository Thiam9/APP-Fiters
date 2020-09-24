const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3333;

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "nameDeMonDb";
const dbCollection = "dbCollection";


app.set("view engine", "pug");
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

/******  Affichage de la card  *******/
app.get("/", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) return;
    const collection = client.db(dbName).collection(dbCollection);
    collection.find().toArray((err, data) => {
      client.close();
      res.render("index", { data: data });
    });
  });
});

/****** Création de la card ******/
app.post("/", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) return;
    const collection = client.db(dbName).collection(dbCollection);
    collection.insertOne(
      {
        id: req.body.id,
        entreprise: req.body.entreprise,
        secteur: req.body.secteur,
        ville: req.body.ville,


      },
      (err, r) => {
        client.close();
        if (err) {
          res.redirect("/");
        } else {
          res.redirect("/");
        }
      }
    );
  });
});


/****** Suppresion de la card  ******/
app.get("/:id", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) return;
    const collection = client.db(dbName).collection(dbCollection);
    collection.find({ id: req.params.id }).toArray((err, data) => {
      if (data.length) {
        collection.deleteOne({ id: req.params.id });
        res.redirect("/");
      } else {
        client.close();
        res.redirect("/");
      }
    });
  });
});


app.listen(port, () => {
  console.log(`Serveur démarre sur le port ${port}`);
});
