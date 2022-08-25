const express = require('express')

const router = express.Router()
const {register, login, token} = require('../controller')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/token').post(token)

module.exports = router
