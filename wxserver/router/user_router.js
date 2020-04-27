const express = require('express')
const jwt = require('jsonwebtoken');
const uuid = require('node-uuid');
const axios = require('axios');
const router = express.Router()
const user = require('../models/user')
const { autojwt } = require('./auto_jwt')


// 登录
router.post('/login', async function (req, res) {
    const { code, nickName, gender, country, avatarUrl } = req.body
    const appid = ''
    const secret = ''
    const datas = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`)
    const openid = datas.data.openid
    const bool = await user.count({
        where: {
            openid
        }
    })
    if (bool == 0) {
        // 数据库没记录，注册返回token
        console.log('数据库没记录，注册并返回token')
        const secret = 'token'
        const created = Math.floor(Date.now() / 1000);
        const id = uuid.v4()    //用户id
        user.create({
            openid, id, nickName, gender, country, avatarUrl
        })
        const userinfo = { id, nickName, gender, country, avatarUrl }
        const token = jwt.sign({
            userinfo,
            exp: created + 60 * 60, //一小时后过期
        }, secret)
        res.status(200).json({ token })
    } else {
        // 数据库有记录，登录返回token
        console.log('数据库有记录，生成token并返回')
        const userinfo = await user.findOne({
            attributes: ['id', 'nickName', 'gender', 'country', 'avatarUrl'],
            where: {
                openid
            }
        })
        const secret = 'token'
        const created = Math.floor(Date.now() / 1000);
        const token = jwt.sign({
            userinfo,
            exp: created + 60 * 60, //一小时后过期
        }, secret)
        res.status(200).json({ token })
    }

})

// 获取数据
router.get('/getdata', async function (req, res) {
    const bool = autojwt(req)
    console.log(bool)
    if (bool.code == 1) {
        res.status(200).json({ message: 'hello world' })
    } else {
        res.status(400).json({ message: 'token is false' })
    }
})

module.exports = router