const express = require('express');

const router = express.Router();
const { registerUser, authUser, allUser } = require('../Controllers/userController')

router.route('/').post(registerUser).get(allUser)
router.post("/login", authUser)




module.exports = router;




