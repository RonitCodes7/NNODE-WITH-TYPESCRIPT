import express from "express"
const app = express()
app.use("/", (req, res) => {
    res.status(200).send({ message: "Hello from food backend"})
})
app.listen(8080, () => {
    console.log("Listening on server 8080")
})