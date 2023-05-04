const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const {Ingredient} = require("../../db/models")

router.post(
    '/',
    asyncHandler(async(req,res)=>{
        const{name,category,ozInCup} = req.body
        const ingredient = Ingredient.add({name,category,ozInCup});
        return res.json({ingredient})
}))

module.exports = router;
