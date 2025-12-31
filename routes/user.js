const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('Get All Users'))
router.post('/', (req, res) => res.send('Register new User'))
router.put('/', (req, res) => res.send('Update User'))
router.delete('/:id', (req, res) => res.send('Delete user'))
router.get('/:id', (req, res) => res.send('User with id'))

module.exports =  router