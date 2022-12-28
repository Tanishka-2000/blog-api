const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('home route working');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log('app listening on port '+ PORT));