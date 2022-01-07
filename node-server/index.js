const express = require('express');
let mongoose = require('mongoose');
let config = require('./config');

// Constants
const port = 8080;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World 8');
});

mongoose.connect('mongodb://db:27022')
  .then(console.log("running"))
  .catch(err => {
    console.log(err)
  })
app.listen(port, () => { console.log(`Server is running on port ${port}`)});