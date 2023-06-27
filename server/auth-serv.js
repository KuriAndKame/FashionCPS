const jwt = require('jsonwebtoken')
const secret = 'deusEx_machina123'
const bcryptjs = require('bcryptjs')

function createToken(userFromDB){
    const token = jwt.sign({ id: userFromDB.id}, secret, {expiresIn: "2 days"})
    return 'bearer' + token
}

function verifyToken(req, res, next){
    if(req.headers['authorization'] && req.headers['authorization'].length){
        const token = req.headers['authorization'].replace(/(bearer|jwt)\s+/, '')
        jwt.verify(token, secret, (err, decodeToken) => {
            if(err) {
                return res.status(401).send({message: "Failed to authenticate token"})
            }
            req.credentials = {id: decodeToken.id}
            next()
        })
    } else {
        return res.status(401).send({message: "Failed to authenticate token"})
    }

}

function createPasswordHashSync(password){
    const salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(password, salt)
}

function comparePassword(password, hash){
    if (typeof password == 'string') return bcryptjs.compareSync(password, hash)
    else return false
} 

module.exports = {
    createToken,
    verifyToken,
    createPasswordHashSync,
    comparePassword
}