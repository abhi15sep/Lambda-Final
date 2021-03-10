const express = require('express');
const routes = express.Router()

const { SlackEvent } = require('./Controllers/SlackController')

routes.post('/slack-event', SlackEvent)

module.exports = routes