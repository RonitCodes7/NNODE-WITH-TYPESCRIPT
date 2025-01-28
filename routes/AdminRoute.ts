const express = require("express")
const router = express.Router()
import { Request, Response, NextFunction } from "express"
import { createVendor, getVendors, getVendorById } from "../controller/Admins.controller"
import { authenticated } from "../middleware"
router.use(authenticated)
router.get("/vendors", getVendors)
router.post("/createVendor", createVendor)
router.get("/vendor/:id", getVendorById)

export { router as AdminRoute }