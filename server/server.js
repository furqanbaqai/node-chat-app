const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname + '/../public');

console.log(publicPath);

/******************************************/
// Setup Express 
var app = express(); // Declared on line #2

// Configuring Static middleware
// Ref: http://expressjs.com/en/starter/static-files.html
app.use(express.static(publicPath));

const port = 3000


app.listen(port, () => {
    console.log(`Started express on port ${port}`);
});

/******************************************/