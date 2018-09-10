const express = require("express");
const bodyParser = require('body-parser');
const _ = require("lodash");
const path = require("path");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicPath));


app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
  
module.exports = {app};