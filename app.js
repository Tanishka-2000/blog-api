const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const apiRouter = require('./api/user.js');

// connection to database 
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODBURL, {}, err => {
  console.log('mongodb connection error');
  console.log(err);
});

const app = express();
app.use(cors());

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log('app listening on port '+ PORT));