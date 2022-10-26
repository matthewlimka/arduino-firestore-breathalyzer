const express = require('express');
var app = express();
//var {SerialPort} = require('serialport');
//var serialPort = new SerialPort({
//  path: '',
//  baudRate: 115200
//});
//var SerialPort = require('serialport');
//var serialPort = new SerialPort('COM3', {
//  baudrate: 115200
//});

const PORT = process.env.PORT || 8080;
//var fire = require('./fire');
const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

// Switches the port into "flowing mode"
//serialPort.on('data', function(data) {
//  console.log('Data:', data);
//});

// Read data that is available but keep the stream from entering "flowing mode"
//serialPort.on('readable', function() {
//  console.log('Data:', port.read());
//});

app.use(express.json());

app.get('/users',  (req, res) => {
  res.send('Why is this not working sia')
});

app.get('/users/:uid', (req, res) => {
  const {uid} = req.params.uid;
  res.send('Your UID is ${uid}')
})

app.post('/History/:uid', (req, res) => {
  const db = admin.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  db.collection('History').add({
    Value: req.body.Value,
    Status: req.body.Status,
    Timestamp: FieldValue.serverTimestamp()
  });
  res.send({
    Value: req.body.Value,
    Status: req.body.Status,
    Timestamp: FieldValue.serverTimestamp()
  })
})

app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`)
})


// const db = admin.firestore();
// db.collection('History').doc('')

// var fire = require('./fire')
// var cors = require('cors');
// var bodyParser = require('body-parser');

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//   res.send(
//     '<h1>Tes Express & Firebase Cloud Firestore</h1><ul><li><p><b>POST /data/MKRWiFi1010</b>  => {suhu, lembab, analog}</p></li><li><p><b>POST /data/esp32</b>  => {suhu, lembab, analog}</p></li><li><p><b>POST /data/mkr1000</b>  => {suhu, lembab, analog}</p></li></ul>')
// })

// app.post('/data/MKRWiFi1010', (req, res)=>{
//   const db = fire.firestore();
// 	db.settings({
//       timestampsInSnapshots: true
//     });
//     db.collection('History').add({
//       Value: req.body.Value,
//       Status: req.body.Status,
//       Timestamp: new Date()
//     });
//     res.send({
//       Value: req.body.Value,
//       Status: req.body.Status,
//       Timestamp: new Date(),
//       status: 'POST data sukses!'
//   })
// })