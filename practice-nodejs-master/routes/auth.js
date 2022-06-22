const express = require('express');
const authController = require('../controllers/registerAuth');
const authLog = require('../controllers/login')
const router = express.Router();

router.post("/register", authController.register )
router.post("/login", authLog.login)
 

  module.exports = router;