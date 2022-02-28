const express = require("express")
const { chats } = require("./data/data")
const connectDB = require("./Config/db")
const userRoutes = require('./Routes/userRoutes')
const { notFound, errorHandler } = require("./middleware/errorHandle")
const cors = require("cors");
connectDB()
const app = express()

//for accepting json data 
app.use(express.json())
app.use(cors())
// Error handling middlware 
// app.use(notFound)
// app.use(errorHandler)

app.get("/", (req, res) => {
    res.send("API is Running")
})

app.use('/api/user', userRoutes)

// run server 
app.listen(5000, console.log("Server Running on PORT 5000"))



