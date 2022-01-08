const express = require('express');
const database = require('./database');


// Constants
const port = 8080;

// App
const app = express();
app.use(express.json());

// Routes import
const inventoryRouter = require('./api/inventory');



app.use('/api/inventory', inventoryRouter)


app.listen(port, () => { console.log(`Server is running on port ${port}`)});