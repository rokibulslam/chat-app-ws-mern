const mongoose = require("mongoose");


const uri = `mongodb+srv://touristAdvisor:Q08AhzDnLAVobyPu@cluster0.2efaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })
        console.log(`MongoDB Coneected:${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit()
    }
}
module.exports = connectDB;