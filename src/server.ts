import express from "express"
import dotenv from "dotenv"
import errorHandler from "./middlewares/errorHandler"
import pathHandler from "./middlewares/pathHandler"
import { indexRouter } from "./routes/indexRouter"
import cookieParser from "cookie-parser"
import dbConnect from "./utils/dbConnect"
import RecipeModel from "./database/models/Recipe"
dotenv.config()

const server = express()

const initialCallback = () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    dbConnect()
}

server.listen(process.env.PORT, initialCallback)

server.use(express.json())
server.use(cookieParser())


server.use(indexRouter)
server.use(errorHandler)
server.use(pathHandler)