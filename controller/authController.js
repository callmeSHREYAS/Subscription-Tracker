const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handelLogin = async (req, res) => {
    const { user, email, pwd } = req.body
    if(!user ||  !email || !pwd){
        return res.status(400).json({'message':'Please enter user, email ,pwd are required'})
    }
    const foundUser = await User.findOne({
        $and:[
            {username:user},
            {email:email}
        ]
    }).exec()
    if(!foundUser) return res.sendStatus(401) 
    const match =await bcrypt.compare(pwd , foundUser.password)
    if(match){
        const accessToken = jwt.sign(
            {'username':foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'30s'}
        )
        const refreshToken = jwt.sign(
            {'username':foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        )
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'Lax',   
            secure: false,  
            maxAge: 24 * 60 * 60 * 1000
        });
        console.log(accessToken);
        res.json({ accessToken })
    }else{
        res.sendStatus(401)
    }
}
module.exports = handelLogin