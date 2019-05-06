const config = require('./utils/config');
const express = require('express');
const app = express();
const blogsRouter = require('./controllers/blogs');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

console.log('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cors());

app.use('/api/blogs', blogsRouter);

module.exports = app;
