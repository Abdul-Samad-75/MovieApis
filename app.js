import "dotenv/config"

import express from "express"
import { connect } from "mongoose"
import authRouter from "./router/authRoutes.js"
import movieRouter from "./router/movieRoutes.js"

const app=express()


app.use(express.json())
app.use('/api', authRouter)
app.use('/api/movies',movieRouter)

app.listen(process.env.PORT,async () => {

    await connect(process.env.DB_URL)
    console.log("DB connected")

    console.log(`server connected at http://localhost:${process.env.PORT}`);
    
    
})