import express from "express";
import productModel from "../models/product.js";
import product from "../models/product.js";


const router = express.Router()



//product 전체를 불러오는 api
router.get("/", (req, res) =>{
    productModel
        .find()
        .then(products =>{
            res.json({
                msg : "get all products",
                count : products.length,
                products : products
            })
        })
        .catch(err => {
            res.json({
                meg : err.message
            })
        })
})
//특정 product를 불러오는 api
router.get("/:productid", (req , res) =>{
    productModel
        .findById(req.params.productid)
        .then(product => {
            if(!product){
                return res.json({
                    msg : "No data"
                })
            }
            res.json({
                msg : "Successful get product",
                product : product
            })
        })
        .catch(err => {
            res.json({
                mes : err.message
            })
        })

})

//product 등록하는 api
router.post("/create", (req, res) => {
    // const newProduct = {
    //     name : req.body.productName,
    //     price : req.body.productPrice,
    //     desc : req.body.productDesc
    // }

    const newProduct = new productModel({
        name : req.body.productName,
        price : req.body.productPrice,
        desc : req.body.productDesc,
        category : req.body.productCategory
    })
    newProduct
        .save()
        .then(result => {
            res.json({
                msg : "Sucessful create a user",
                user : {
                    name : result.name,
                    price : result.price,
                    desc : result.desc,
                    id : result._id
                }
            })
        })
        .catch(err =>{
            res.json({
                msg : err.message
            })
    })


    // res.json({
    //     msg : "created a product",
    //     product : newProduct
    // })
})

router.put("/update", (req, res) =>{
    res.json({
        msg : "update a product"
    })
})
//product 전체를 삭제하는 api
router.delete("/", (req, res) =>{
    productModel
        .deleteMany()
        .then(_=> {
            res.json({
                msg : "deleted all product"
            })

        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})

router.delete("/:prdoductid", (req , res) =>{
    productModel
        .findByIdAndDelete(req.params.productid)
        .then(_=> {
            res.json({
                msg :"deleted product"
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})




export default router