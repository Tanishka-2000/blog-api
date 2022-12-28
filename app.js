const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const apiRouter = require('./api/index.js');
require('dotenv').config()

// connection to database 
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODBURL)
  .catch(err => {
  console.log('mongodb connection error');
  console.log(err);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log('app listening on port '+ PORT));