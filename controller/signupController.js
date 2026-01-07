const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const handleNewUser = async(req,res)=>{
    const { user, email, pwd } = req.body
    if (!user || !email || !pwd) {
        res.status(400).json({ 'message': 'username , email and password are required' })
    }
    const duplicate = await User.findOne({
        $or: [
            { username: user },
            { email: email }
        ]
    }).exec()
    if (duplicate) return res.sendStatus(409);

    try {
        const hashPwd = await bcrypt.hash(pwd, 10)
        const result = await User.create({
            'username': user,
            'email': email,
            'password': hashPwd
        })
        console.log(result);
        res.status(201).json({ 'success': `New user ${user} created!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports=handleNewUser