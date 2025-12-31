require('dotenv').config();
const express=require('express')
const app=express()
const mongoose=require('mongoose');
const connectDB = require('./config/dbConn');
const PORT= process.env.PORT
app.use(express.urlencoded({extended:false}))
app.use(express.json())


connectDB()
app.use('/auth',require('./routes/auth'))
app.use('/subscription',require('./routes/subscription'))
app.use('/user',require('./routes/user'))


mongoose.connection.once('open',()=>{
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})