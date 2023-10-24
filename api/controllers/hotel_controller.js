import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js";

export const createHotel = async(req, res, next)=>{
    if (req.user.isAdmin) {
        const newHotel = new Hotel(req.body)
        try{
            const savedHotel = await newHotel.save()
            res.status(200).json(savedHotel) //200 - cod pt succes
        }catch(err){
            next(err);
        }
    }
}

export const updateHotel = async(req, res, next)=>{
    if (req.user.isAdmin) {
        try{
            const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new:true})
            res.status(200).json(updatedHotel) //200 - cod pt succes
        }catch(err){
            next(err); // 500 - cod pt eroare
        }
    }
}

export const deleteHotel = async(req, res, next)=>{
    if (req.user.isAdmin) {
        try{
            await Hotel.findByIdAndDelete(req.params.id)
            res.status(200).json("Hotel has been deleted") //200 - cod pt succes
        }catch(err){
            next(err);
        }
    }
}

export const getHotel = async(req, res, next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel) //200 - cod pt succes
    }catch(err){
        next(err);
    }
}

export const getHotels = async(req, res, next)=>{
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels) //200 - cod pt succes
    }catch(err){
        next(err);
    }
}