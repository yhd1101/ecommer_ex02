import express from "express"
import productRoutes from "./route/product.js"
import product from "./route/product.js";
import orderRouters from "./route/oreder.js"
import morgan from "morgan"



const app = express()

app.use(morgan("common"))







app.use("/hello", (req, res) => {
    res.json({
        data : "Hello world",
        body : "hi"
    })
})


app.use("/product", productRoutes)
app.use("/order", orderRouters)


const port = 7000
app.listen(port, console.log("Server started"))