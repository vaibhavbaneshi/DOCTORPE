import { app } from "./app.js"
import { connectDB } from "./db/db.js"
import dotenv from "dotenv"

dotenv.config()

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`⚙️ Server is listening at port: ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log("There was an error while connecting to the database!!!", error);
    })

