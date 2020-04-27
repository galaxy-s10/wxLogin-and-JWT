const Sequelize = require('sequelize')
const sequelize = require('../config/db')
const user = sequelize.define(
    'user',
    {
        openid: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nickName: {
            type: Sequelize.STRING,
            default: null
        },
        gender: {
            type: Sequelize.INTEGER,
            default: 0
        },
        country: {
            type: Sequelize.STRING,
            default: ''
        },
        avatarUrl: {
            type: Sequelize.STRING,
            default: null
        }

    },
    {
        // timestamps: false,
        freezeTableName: true
    }
)

// user.sync({ force: true }).then((res) => {
//     console.log('// 如果表存在 会删除表重新建表')
// })


module.exports = user