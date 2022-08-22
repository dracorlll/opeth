// error handler middleware
// eslint-disable-next-line no-unused-vars
const catchError = ((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error'
    }
  })
})

module.exports = catchError
