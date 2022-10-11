import express from "express"
import router from "./router/route.js";
import bodyParser from "body-parser";
import cors from "cors"

const app = express()
app.use(bodyParser.json())
app.use(cors())


app.use("/api", router)


app.listen("5000", () => {
    console.log("Server started")
})

