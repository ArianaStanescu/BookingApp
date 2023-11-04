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
    // try{
    //     const hotels = await Hotel.find(req.query).limit(req.query.limit);
    //     res.status(200).json(hotels) //200 - cod pt succes
    // }catch(err){
    //     next(err);
    // }
    try {
        const {limit, featured, min, max, ...others} = req.query;
        const hotels = await Hotel.find({...others, cheapestPrice: {$gt: min || 1 , $lt: max || 10000}}).limit(limit);
        return res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}

export const countByCity = async(req, res, next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list) //200 - cod pt succes
    }catch(err){
        next(err);
    }
}

export const countByType = async(req, res, next)=>{
    const hotelCount = Hotel.countDocuments({type:"hotel"})
    try{
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const villaCount = await Hotel.countDocuments({type:"villa"})
        const cabinCount = await Hotel.countDocuments({type:"cabin"})
        res.status(200).json([
            {type:"hotels", count: hotelCount},
            {type:"apartments", count: apartmentCount},
            {type:"resorts", count: resortCount},
            {type:"villas", count: villaCount},
            {type:"cabins", count: cabinCount},
        ])
    }catch(err){
        next(err);
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room) =>
            {
                return Room.findById(room);
            })
        );
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
};