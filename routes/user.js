const express = require('express')
const { getAllUsers, postNewUser, updateUser, deleteUser, getUser } = require('../controller/userController')
const router = express.Router()

router.get('/', getAllUsers)
router.post('/', postNewUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/:id', getUser)

module.exports =  router