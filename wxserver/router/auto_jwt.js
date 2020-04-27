var jwt = require('jsonwebtoken');
// 验证token
function autojwt(req) {
    if (req.headers.authorization == undefined) {
        console.log('没有Authorization,验证token不通过')
        return { code: 0 }
    }
    const token = req.headers.authorization.split(" ")[1]
    const secret = 'token'
    return jwt.verify(token, secret, (err, decode) => {
        if (err) {
            console.log('验证token不通过')
            return { code: 0, decode }
        } else {
            console.log('验证token通过')
            return { code: 1, decode }
        }
    })
}

module.exports = { autojwt }