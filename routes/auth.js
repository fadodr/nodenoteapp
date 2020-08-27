const express = require('express');
const router = express.Router();
const authcontroller = require('../controller/authcontroller');

router.post('/register', authcontroller.signup_user);
router.post('/login', authcontroller.login_user);
router.post('/forgetpassword', authcontroller.forget_password);
router.post('/resetpassword', authcontroller.reset_password);
router.post('/refreshtoken', authcontroller.refresh_token);

module.exports = router;