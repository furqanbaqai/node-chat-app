const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;

/******************************************/
// Setup Express 
var app = express(); // Declared on line #2

// Configuring Static middleware
// Ref: http://expressjs.com/en/starter/static-files.html
app.use(express.static(publicPath));




app.listen(port, () => {
    console.log(`Started express on port ${port}`);
});

/******************************************/