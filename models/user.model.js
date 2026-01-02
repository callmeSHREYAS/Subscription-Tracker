const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        trim: true,
        minLength: 4,
        maxLength: 20
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'User Email is required'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter Password'],
        minLength: [8, 'password length must be atleast 8']
    }
}, { timestamps: true })

const User = mongoose.model('User',userSchema)

module.exports = User