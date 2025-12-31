const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('Get All Subscription'))

router.get('/:id', (req, res) => res.send('Get All Subscription'))

router.post('/', (req, res) => res.send('Get All Subscription'))

router.put('/', (req, res) => res.send('Get All Subscription'))

router.delete('/:id', (req, res) => res.send('Get All Subscription'))

router.get('/user/:id', (req, res) => res.send('Get All Subscription'))

router.put('/:id/cancel', (req, res) => res.send('Get All Subscription'))

router.get('/upcoming-renewals', (req, res) => res.send('Get All Subscription'))

module.exports = router