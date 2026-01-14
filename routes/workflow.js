const express = require('express')
const { sendReminders } = require('../controller/workflowController')
const router = express.Router()

router.post('/subscription/reminder', sendReminders)

module.exports = router