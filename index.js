//Importing necessary libraries
const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const movieRouter = require('./routes')

//Creating express app
const app = express();
const apiPort = 3003;

//Setting up express app
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.use('/api', movieRouter)

//Tell app to listen for new calls and sleep when none are arriving
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));