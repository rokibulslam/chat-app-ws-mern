const express = require('express');

const router = express.Router();
const { registerUser } = require('../Controllers/userController')

router.route('/').post(registerUser)
// router.post("/login", authUser);



module.exports = router;




