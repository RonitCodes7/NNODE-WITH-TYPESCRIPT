const express = require("express")
const router = express.Router()
import { Request, Response, NextFunction } from "express"
import { getSingleVendorProfile, updateVendorService, vendorLogin } from "../controller/Vendors.controller"
import { authenticated } from "../middleware"
router.use(authenticated)
router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Hello from Vendor"
    })
})
router.post("/login", vendorLogin)
router.get("/profile", getSingleVendorProfile)
router.patch("/service", updateVendorService)
export { router as VendorRoute }