const express = require('express');
const PORT = process.env.PORT || 8080;
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');
const { cert } = require('firebase-admin/app');
admin.initializeApp({
  credential: cert(serviceAccount),
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const db = admin.firestore();
  db.settings({
    timestampsInSnapshots: true
  });

app.get('/',  (req, res) => {
  res.send('<h1>Data from MQ3 sensor on Arduino MKR WiFi 1010 to be sent to Firestore database</h1><ul><li><p><b>GET /firestoredata</b></p></li><li><p><b>POST /firestoredata</b> => {Value, BAC, Status}</p></li></ul>')
});

app.get('/firestoredata', (req, res) => {
  var wholeData = []
  db.collection('History').get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      wholeData.push(doc.data())
    });
    console.log(wholeData)
    res.send(wholeData)
  })
  .catch(error => {
   console.log('Error!', error);
  })
})

app.post('/firestoredata', (req, res) => {
  db.collection('History').add({
    Value: req.body.Value,
    BAC: req.body.BAC,
    Status: req.body.Status,
    Timestamp: new Date()
  });
  res.send({
    Value: req.body.Value,
    BAC: req.body.BAC,
    Status: req.body.Status,
    Timestamp: new Date()
  })
})

app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`)
})