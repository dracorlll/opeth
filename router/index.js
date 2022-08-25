const express = require('express')

const router = express.Router()
const {googleAPI, clientService} = require('../controller')

router.route('/search').get(googleAPI.search)
router.route('/register').post(clientService.register)
router.route('/login').post(clientService.login)
router.route('/token').post(clientService.token)

module.exports = router
