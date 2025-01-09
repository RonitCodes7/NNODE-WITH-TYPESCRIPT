const express = require("express")
const router = express.Router()
import { Request, Response, NextFunction } from "express"

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Hello from admin"
    })
})

export { router as AdminRouter }
