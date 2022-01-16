const express = require('express');
const database = require('./database');
const compression = require('compression');
const cors = require('cors');
const request = require("supertest");


// Constants
const port = 8080;

// App
const app = express();
app.use(express.json());
app.use(compression());
app.use(cors());

// Routes import
const inventoryRouter = require('./api/inventory');
const groupsRouter = require('./api/groups');


app.use('/api/inventory', inventoryRouter);
app.use('/api/groups', groupsRouter);


app.listen(port, () => { 
    console.log(`Server is running on port ${port}`)
});

process.on('SIGTERM', () => {
    console.log("Terminating Server")
    app.close();
  });

module.exports = app