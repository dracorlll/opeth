const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

// email validation
const isEmailValid = (email) => {
  if (!email) return false

  if (email.length > 254) return false

  const valid = emailRegex.test(email)
  if (!valid) return false

  // Further checking of some things regex can't handle
  const parts = email.split('@')
  if (parts[0].length > 64) return false

  const domainParts = parts[1].split('.')
  return !domainParts.some((part) => part.length > 63)
}

// validating the password
const passwordValidator = (value) => {
  const errors = []
  if (value.match(/^(?=.*[a-z])/) === null) {
    errors.push('Password must contain at least 1 lowercase alphabetical character')
  }
  if (value.match(/^(?=.*[A-Z])/) === null) {
    errors.push('Password must contain at least 1 uppercase alphabetical character')
  }
  if (value.match(/^(?=.*[0-9])/) === null) {
    errors.push('Password must contain at least 1 numeric character')
  }
  if (value.match(/^(?=.*[!@#$%^&*])/) === null) {
    errors.push('Password must contain at least one special character')
  }
  if (value.match(/^(?=.{8,})/) === null) {
    errors.push('Password must be eight characters or longer')
  }
  return errors
}
// todo it can be shorter
const registrationValidator = ((req, res, next) => {
  const {email, password} = req.body
  const errors = passwordValidator(password)
  if (isEmailValid(email) === false) errors.push('Email is not valid')
  if (errors.length > 0) {
    return next({status: 400, message: errors})
  }
  next()
})

module.exports = registrationValidator
