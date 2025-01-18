import express from "express"
import bodyParser from "body-parser"
import "./database"
import { AdminRouter, VendorRouter } from "./routes"
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true}))
app.use("/admin", AdminRouter)
app.use("/vendor", VendorRouter)

app.listen(8080, () => {
    console.log("Listening on server 8080")
})