const express = require('express')

const router = express.Router()
const {add, remove, list} = require('../controller')

router.route('/add').post(add)
router.route('/remove').post(remove)
router.route('/list').post(list)

module.exports = router
