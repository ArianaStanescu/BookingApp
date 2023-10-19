import express from "express";
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js";

const router = express.Router();

//create
router.post("/", async (req,res)=>{

    const newHotel = new Hotel(req.body)

    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel) //200 - cod pt succes
    }catch(err){
        res.status(500).json(err) // 500 - cod pt eroare
    }
});

//update
router.put("/:id", async (req,res)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new:true})
        res.status(200).json(updatedHotel) //200 - cod pt succes
    }catch(err){
        res.status(500).json(err) // 500 - cod pt eroare
    }
});

//delete
router.delete("/:id", async (req,res)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted") //200 - cod pt succes
    }catch(err){
        res.status(500).json(err) // 500 - cod pt eroare
    }
});

//get
router.get("/:id", async (req,res)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel) //200 - cod pt succes
    }catch(err){
        res.status(500).json(err) // 500 - cod pt eroare
    }
});

//get all
router.get("/", async (req,res,next)=>{
    //const failed = true;
    //if(failed) return next(createError(401, "You are not authenticate"));

    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels) //200 - cod pt succes
    }catch(err){
        //res.status(500).json(err) // 500 - cod pt eroare
        next(err)
    }
});

export default router