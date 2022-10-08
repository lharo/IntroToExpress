//Importing necessary libraries
const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
var firebase = require("firebase-admin");

var serviceAccount = require("./key.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

// Create db and a collection within it
const db = firebase.firestore();

//Creating express app
const app = express();
const apiPort = 3003;

//Setting up express app
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

//Creating endpoint
app.get('/', (req, res) => {
  res.send('Hello World');
});

// CREATE
//Create movie
app.post('/create', async (req, res) => {
  try {
    const { body: movie } = req;
    const moviesDb = db.collection('movies');
    // const resp = moviesDb.doc({id}).set(movie);
    const { _path: { segments } } = await moviesDb.add(movie);
    const id = segments[1];
    res.send({
      status: 200,
      id
    });
  } catch (error) {
    res.send(error);
  }
})

// GET
//GET movie
app.get('/get-movie/{:id}', async (req, res) => {
  try {
    const moviesDb = db.collection('movies');
    // const resp = moviesDb.doc({id}).set(movie);
    const movie = await moviesDb.get(id);
    res.send({
      status: 200,
      movie
    });
  } catch (error) {
    res.send(error);
  }
})

//Tell app to listen for new calls and sleep when none are arriving
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));