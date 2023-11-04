import express from "express";
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js";
import {
    createHotel, deleteHotel, getHotel, getHotels, updateHotel,
    countByCity, countByType, getHotelRooms
} from "../controllers/hotel_controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/",verifyAdmin, createHotel);

//update
router.put("/:id",verifyAdmin, updateHotel);

//delete
router.delete("/:id",verifyAdmin, deleteHotel);

//get
router.get("/find/:id", getHotel);

//get all
router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countbyType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;