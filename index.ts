import express from "express"
import { AdminRouter, VendorRouter } from "./routes"
const app = express()
app.use("/admin", AdminRouter)
app.use("/vendor", VendorRouter)
app.listen(8080, () => {
    console.log("Listening on server 8080")
})