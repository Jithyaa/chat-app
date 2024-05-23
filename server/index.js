import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import connect from './database/connect.js';

const app = express();
const port=process.env.PORT || 5000

dotenv.config()

app.use(express.json()) // to parse the incoming requests with JSON payloads (from req.body)

// app.get('/',(req,res)=>{
//     res.send("Home!")
// })

app.use("/api/auth",authRoutes)

app.listen(port,()=>{
    connect();
    console.log(`Server is running on ${port}`)
});
console.log("Ohhh Yeahh🔥");