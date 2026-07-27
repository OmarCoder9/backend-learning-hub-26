import express from "express";
import usersRoutes from "./routes/user.route";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
dotenv.config()
const app = express();
app.use(cookieParser())
app.use(express.json())
app.use("/auth", usersRoutes)

app.listen(3000, () =>
  console.log("Server is Running at http://localhost:3000"),
);
