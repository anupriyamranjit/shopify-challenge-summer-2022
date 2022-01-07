const express = require('express');

// Constants
const port = 8080;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World 8');
});

app.listen(port, () => { console.log(`Server is running on port ${port}`)});