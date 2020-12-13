require('dotenv').config();
const express = require('express');
const app = express();
const system = require('./system');
const parser = require('body-parser');
const cors = require('cors');

app.set('port', process.env.PORT ? process.env.PORT : 3000);

app.use(cors());
app.use(parser.urlencoded());
app.use(parser.json());

app.use('/api', system);
app.use('/', express.static('public'));

const server = app.listen(app.get('port'), function() {
	console.log(server.address());
});