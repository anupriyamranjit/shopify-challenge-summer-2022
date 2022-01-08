const express = require('express');
const database = require('./database');
const compression = require('compression');


// Constants
const port = 8080;

// App
const app = express();
app.use(express.json());
app.use(compression());

// Routes import
const inventoryRouter = require('./api/inventory');



app.use('/api/inventory', inventoryRouter)


app.listen(port, () => { console.log(`Server is running on port ${port}`)});