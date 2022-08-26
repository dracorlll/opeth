module.exports = (sequelize, DataTypes) => sequelize.define('bookmark', {
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
