const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './DB.sqlite'
})

sequelize.sync()

class Info extends Model { }

Info.init({
    company: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    msg: DataTypes.STRING
}, {
    sequelize,
    modelName: 'info'
})

module.exports = Info