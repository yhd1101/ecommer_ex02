import express from "express";
import orderModel from "../models/order.js";
import productModel from "../models/product.js";

const router = express.Router()
router.get("/", (req, res) =>{
    orderModel
        .find()
        .populate("product")
        .then(orders =>{
            res.json({
                msg : "get all orders",
                count : orders.length,
                orders : orders
            })
        })
        .catch(err => {
            res.json({
                meg : err.message
            })
        })
})
//특정 product를 불러오는 api
router.get("/:orderid", (req , res) =>{
    orderModel
        .findById(req.params.orderid)
        .populate("product")
        .then(product => {
            if(!order){
                return res.json({
                    msg : "No data"
                })
            }
            res.json({
                msg : "Successful get order",
                order : order
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

    const newOrder = new orderModel({
       product : req.body.product,
        qty : req.body.qty,
        memo : req.body.memo
    })
    newOrder
        .save()
        .then(result => {
            res.json({
                msg : "Sucessful ",
                user : {
                    product : result.product,
                    qty : result.qty,
                    memo : result.memo
                }
            })
        })
        .catch(err =>{
            res.json({
                msg : err.message
            })
        })



})

router.put("/:orderid", (req, res) =>{
    const orderid = req.params.orderid

    const updateOps = {}

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }

    orderModel
        .findByIdAndUpdate(orderid, {$set : updateOps})
        .then(_ => {
            res.json({
                msg : `update product by ${orderid}`
            })
        })
        .catch(err =>{
            res.json({
                msg : err.message
            })
        })
})
//product 전체를 삭제하는 api
router.delete("/", (req, res) =>{
    orderModel
        .deleteMany()
        .then(_=> {
            res.json({
                msg : "deleted all order"
            })

        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})

router.delete("/:ordertid", (req , res) =>{
    orderModel
        .findByIdAndDelete(req.params.orderid)
        .then(_=> {
            res.json({
                msg :"deleted order"
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})


export default router