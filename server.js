require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const arcjetMiddleware = require('./middleware/arcjet.middleware');

const PORT = process.env.PORT

app.use(logger)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(arcjetMiddleware)

connectDB()
app.use('/auth', require('./routes/auth'))
app.use('/subscription', require('./routes/subscription'))
app.use('/user', require('./routes/user'))
app.use('/workflow' , require('./routes/workflow'))

app.use(errorHandler)
mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})