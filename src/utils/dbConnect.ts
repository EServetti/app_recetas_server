import mongoose from "mongoose"
import CustomError from "./customError"

const dbConnect = async () => {
   try {
    if (!process.env.MONGO_CONNECTION) {
        const error = new CustomError(500, "Not connection provided to db.")
        throw error
    }
    await mongoose.connect(process.env.MONGO_CONNECTION)
    console.log("Connected to db.");
   } catch (error) {
    throw error
   }
}

export default dbConnect