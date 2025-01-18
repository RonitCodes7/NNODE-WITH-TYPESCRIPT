const express = require("express")
const router = express.Router()
import { Request, Response, NextFunction } from "express"
import { createVendor, getVendors, getVendorById } from "../controller/Vendor.controller"
router.get("/vendors", getVendors)
router.post("/createVendor", createVendor)
router.get("/:id", getVendorById)

export { router as VendorRouter }