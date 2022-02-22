// install async handler: express-async-handler
// async handler automatically handles error

const asyncHandler = require('express-async-handler');
const res = require('express/lib/response');
const User = require('../models/userModel')

const registerUser = asyncHandler( async(req, res)=> {
    
    const { name, email, password, picture } = req.body;

    // if some of this value is undefined it throw an error 
    if (!name || !email || !password) {
        throw new Error("Please Fill up all input field Correctly")
    }
    // Checking user is already in database 
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists")
    }
    // If user not exists it will create new user 
    const user = await User.create({
        name, email, password, picture
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,        //if success
            email: user.email,
            picture: user.pic,
        }) 
    } else {
        res.status(400);
        throw new Error("Failed to create User")
    }
})