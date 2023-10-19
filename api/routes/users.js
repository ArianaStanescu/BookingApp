import express from "express";
import {updateUser, deleteUser, getUser, getUsers} from "../controllers/user_controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req,res,next)=>{
    res.send("Hello user, you are logged in!");
})

//update
router.put("/:id", updateUser);

//delete
router.delete("/:id", deleteUser);

//get
router.get("/:id", getUser);

//get all
router.get("/", getUsers);

export default router