const express = require('express')

const router = express.Router()
const {search} = require('../controller')

router.route('/search').get(search)

module.exports = router
