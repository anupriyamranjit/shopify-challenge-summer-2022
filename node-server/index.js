const express = require('express');
const database = require('./database');
const cors = require('cors');


// Constants
const port = 8080;

// App
const app = express();
app.use(express.json());
app.use(cors());

// Routes import
const inventoryRouter = require('./api/inventory');
const groupsRouter = require('./api/groups');

// Use these routes
app.use('/api/inventory', inventoryRouter);
app.use('/api/groups', groupsRouter);

// Listen on port 8080
app.listen(port, () => { 
    console.log(`Server is running on port ${port}`)
});


module.exports = app