const bcrypt = require("bcryptjs");
const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: {
    type: String,
    default: "https://i.ibb.co/JqJyrnc/profile.jpg",
  },
},
    {timestamps: true}
);
// Password matching handle 
userSchema.methods.matchPassword = async function (rawPassword) {
  return await bcrypt.compare(rawPassword, this.password)
}

// Decrypt password before saving password to database 

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema)

module.exports = User;
