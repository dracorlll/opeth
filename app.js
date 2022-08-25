const express = require('express')
const morgan = require('morgan')
const {errorHandler} = require('./middleware')

const app = express()
app.use(express.json())

app.use('/api', require('./router'))

app.use(morgan('dev'))
app.all('*', (req, res, next) => {
  next({status: 404, message: 'Not Found'})
})
app.use(errorHandler)

app.listen(3000, async () => {
  console.log('Server running on PORT 3000')
})
