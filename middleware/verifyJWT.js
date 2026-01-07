const jwt = require('jsonwebtoken')


const verifyJWT = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader?.startsWith('Bearer ')){
        return res.sendStatus(401)
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        (err,decoded)=>{
            if(err)return res.sendStatus(403);
            req.user=decoded.username;
            next()
        }
    )
}
module.exports = verifyJWT