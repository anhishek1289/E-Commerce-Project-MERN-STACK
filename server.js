import express from "express"

import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./Connection/database.js"
import morgan from "morgan"
import authRoute from "./routes/authRoute.js"
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import path from "path"
const app= express(); 
//configures env
dotenv.config();
// const PORT = process.env.PORT || 4500;
app.use(cors());
//Middleware
app.use(express.json());
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './ecommerce/build')))

//DataBase Connect
connectDB();

//routes
app.use('/api/v1/auth', authRoute);
//Rooutes for Category
app.use('/api/v1/category', categoryRoute);
//Routes for Product
app.use('/api/v1/product', productRoute);

app.use("*", (req,res)=>{
    res.send(path.join(__dirname, './ecommerce/build/index.html'))
})
const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running at https://localhost:${PORT}`.bgRed.white)
})
