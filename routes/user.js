const express = require('express')
const { getAllUsers, postNewUser, updateUser, deleteUser, getUser } = require('../controller/userController')
const verifyJWT = require('../middleware/verifyJWT')
const router = express.Router()

router.get('/',verifyJWT, getAllUsers)
router.post('/', postNewUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/:id', getUser)

module.exports =  router