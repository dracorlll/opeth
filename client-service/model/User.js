module.exports = (sequelize, DataTypes) => sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {isEmail: true}
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
