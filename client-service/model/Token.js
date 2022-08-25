module.exports = (sequelize, DataTypes) => sequelize.define('token', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    validate: {isEmail: true}
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})
