import express from "express"
import productRoutes from "./route/product.js"
import product from "./route/product.js";
import orderRouters from "./route/oreder.js"
import morgan from "morgan"
import bodyParser from "body-parser";
import dotEnv from "dotenv"
import mongoose from "mongoose";



const app = express()
dotEnv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use(morgan("common"))
app.use("/product", productRoutes)
app.use("/order", orderRouters)

//데이터베이스 연결정보

const dbAddress = process.env.MONGODB_ADDRESS
mongoose
    .connect(dbAddress)
    .then(_ => console.log("database connected"))
    .catch(err => console.log(err.message))






app.use("/hello", (req, res) => {
    res.json({
        data : "Hello world",
        body : "hi"
    })
})



const port = process.env.PORT || 8500
app.listen(port, console.log("Server started"))