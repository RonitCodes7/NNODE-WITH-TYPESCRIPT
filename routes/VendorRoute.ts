const express = require("express")
const router = express.Router()
import multer from "multer"
import { Request, Response, NextFunction } from "express"
import { getSingleVendorProfile, updateVendorService, vendorLogin, addFoodForSingleVendor } from "../controller/Vendors.controller"
import { authenticated } from "../middleware"
router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Hello from Vendor"
    })
})
router.post("/login", vendorLogin)
router.use(authenticated)
router.get("/profile", getSingleVendorProfile)
router.patch("/service", updateVendorService)
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "images")
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-xxxxx-${file.originalname}`)  // Fix: Use Date.now()
    }
})

const image = multer({ storage: imageStorage }).array('images', 10)
router.post("/addFood",image,addFoodForSingleVendor)
export { router as VendorRoute }