import User from "../models/User.js"

export const updateUser = async(req, res, next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new:true})
        res.status(200).json(updatedUser) //200 - cod pt succes
    }catch(err){
        next(err); // 500 - cod pt eroare
    }
}

export const deleteUser = async(req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted") //200 - cod pt succes
    }catch(err){
        next(err);
    }
}

export const getUser = async(req, res, next)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user) //200 - cod pt succes
    }catch(err){
        next(err);
    }
}

export const getUsers = async(req, res, next)=>{
    try{
        const users = await User.find();
        res.status(200).json(users) //200 - cod pt succes
    }catch(err){
        next(err);
    }
}