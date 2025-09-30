import mongoose from "mongoose"

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected")
    } catch (error) {
        console.log("disConnected")
    }
}
export default connectDb