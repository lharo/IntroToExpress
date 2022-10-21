const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { router } = require('./routes')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


const app = express();
const apiPort = process.env.PORT || 8088;

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));