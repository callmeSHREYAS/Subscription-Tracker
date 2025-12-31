require('dotenv').config();
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('database connected');
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB