const serverless = require('serverless-http')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next)=>{
    next()
})
app.use(require('./routes'))

module.exports.handler = serverless(app)