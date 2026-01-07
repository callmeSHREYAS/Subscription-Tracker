const express = require('express')
const handleNewUser = require('../controller/signupController')
const handelLogin = require('../controller/authController')
const router = express.Router()

router.post('/sign-up', handleNewUser)
router.post('/sign-in', handelLogin)
router.post('/sign-out', (req, res) => res.send('Sign-out'))

module.exports = router  