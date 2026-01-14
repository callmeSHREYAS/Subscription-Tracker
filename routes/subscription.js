const express = require('express')
const verifyJWT = require('../middleware/verifyJWT')
const {createSubscription, getSubscription} = require('../controller/subscriptionController')

const router = express.Router()

router.get('/', (req, res) => res.send('Get All Subscription'))

router.get('/:id', (req, res) => res.send('Get All Subscription'))

router.post('/', verifyJWT , createSubscription)

router.put('/', (req, res) => res.send('Get All Subscription'))

router.delete('/:id', (req, res) => res.send('Get All Subscription'))

router.get('/user/:id',verifyJWT, getSubscription)

router.put('/:id/cancel', (req, res) => res.send('Get All Subscription'))

router.get('/upcoming-renewals', (req, res) => res.send('Get All Subscription'))

module.exports = router