module.exports = (sequelize, DataTypes) => sequelize.define('bookmark', {
  bookId: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {isEmail: true}
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
