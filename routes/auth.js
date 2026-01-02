const express = require('express')
const router = express.Router()

router.post('/sign-up', (req, res) => res.send('Sign-up'))
router.post('/sign-in', (req, res) => res.send('Sign-in'))
router.post('/sign-out', (req, res) => res.send('Sign-out'))

module.exports = router  