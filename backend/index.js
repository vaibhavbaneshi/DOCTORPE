import "dotenv/config"
import { app } from "./app.js"
import { connectDB } from "./db/db.js"

if (!process.env.VERCEL) {
    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Server is listening at port: ${port}`)
    })
}

if (process.env.MONGO) {
    connectDB()
        .then(() => {
            app.locals.database = "connected"
            console.log("Database connected")
        })
        .catch((error) => {
            app.locals.database = "error"
            console.error("Database connection failed:", error.message)
        })
} else {
    app.locals.database = "not-configured"
    console.warn("MONGO is not configured; data routes are unavailable")
}

export default app
