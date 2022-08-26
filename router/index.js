const express = require('express')

const router = express.Router()
const {googleAPI, clientService, bookService} = require('../controller')
const {authorization, registrationValidator} = require('../middleware')
// route for Google Books API
router.route('/search').get(googleAPI.search)
// routes for client service
router.route('/register').post(registrationValidator, clientService.register)
router.route('/login').post(clientService.login)
router.route('/token').post(clientService.token)
// routes for book service
// authorization middleware for verify token
router.route('/add').post(authorization, bookService.add)
router.route('/list').get(authorization, bookService.list)
router.route('/remove/:id').delete(authorization, bookService.remove)

module.exports = router
