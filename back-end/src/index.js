import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";

dotenv.config()
const app = express();
const PORT = process.env.PORT;

//Code chạy theo dòng nên cần lưu ý khai báo gì trước, khai báo gì sau tránh lỗi đọc file
app.use(express.json())
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log("server is running on port: " + PORT)
    connectDB()
})