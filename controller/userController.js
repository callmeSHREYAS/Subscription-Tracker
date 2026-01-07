const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {
    const users = await User.find()
    if (!users) res.status(204).json({ 'message': 'No User exists' });
    res.json(users)
}

const postNewUser = async (req, res) => {
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

const updateUser = async (req, res) => {
    if (!req?.params?.id) {
        res.status(400).json({ 'message': 'Please enter id' })
    }
    const employee = await User.findOne({ _id: req.params.id }).exec()
    if (!employee) return res.status(400).json({ 'message': 'Username with given id not found' });

    if (req.body?.user) employee.username = req.body.user
    if (req.body?.email) employee.email = req.body.email
    if (req.body?.pwd) {
        try {
            const password = req.body.pwd
            const hashPwd = await bcrypt.hash(password, 10)
            employee.password = hashPwd
        } catch (error) {
            return res.status(500).json({ 'message': error.message });
        }
    }
    const result = await employee.save()
    res.json(result)
}

const deleteUser = async (req, res)=>{
    if (!req?.params?.id) {
        res.status(400).json({ 'message': 'Please enter user id' })
    }
    const user = await User.findOne({ _id: req.params.id }).exec()
    if (!user) res.status(400).json({ 'message': 'User with givenid doesn\'t exist' });
    const result = await User.deleteOne({ _id: req.params.id })
    res.json(result)
}

const getUser=async(req,res)=>{
    if (!req?.params?.id) {
        res.status(400).json({ 'message': 'Please enter user id' })
    }
    const user = await User.findOne({ _id: req.params.id }).exec()
    if (!user) res.status(400).json({ 'message': 'User with givenid doesn\'t exist' });
    res.json(user)
    console.log(user);
    
}

module.exports = { getAllUsers, postNewUser, updateUser , deleteUser ,getUser}