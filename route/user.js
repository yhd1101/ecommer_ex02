import express from "express";


const router = express.Router()

//회원가입
router.post("/signup", (req, res) => {
    res.json({
        msg : "signup user"
    })
})


//로그인
router.post("/login", (req, res) => {
    res.json({
        msg : "logged in used"
    })
})



export default router