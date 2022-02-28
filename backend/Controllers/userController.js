// install async handler: express-async-handler
// async handler automatically handles error

const asyncHandler = require('express-async-handler');
const res = require('express/lib/response');
const User = require('../models/userModel')
const generateToken = require('./generateToken')


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
            name: user.name,        //if success  to create a new user
            email: user.email,
            picture: user.pic,
            token: generateToken(user._id)
        }) 
    } else {
        res.status(400)                             //if failed to create user                   
        throw new Error("Failed to create User")
    }
})

// Find one user & match user auth
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    // Chechking user existence 
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,        //if success  to create a new user
            email: user.email,
            picture: user.pic,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error("Worng Email or Password")
    }

})
// Searching Api: /api/user?search=piyush
const allUser = asyncHandler(async (req, res) => {
    const search = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    // search user 
    const users = await User.find(search)
    res.send(users)
})

module.exports = {registerUser, authUser, allUser};