import express from "express"
import { AppDataSource } from "./data-source"
import routes from "./routes"

AppDataSource.initialize().then(() => {

    const port = 8081
    
    const app = express()

    app.use(express.json())

    app.use(routes)

    return app.listen(port)
})