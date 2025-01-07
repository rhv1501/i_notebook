import express from "express";
import path from "path";
export const app = express();
import { mongodb } from "./database/db.js";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import note from "./routes/notes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

dotenv.config();
app.use(express.json());
const __dirname = path.resolve();

//routes
app.use("/api/auth", auth);
app.use("/api/notes", note);

//server
app.listen(8080, () => {
  console.log("server up and running");
  mongodb();
});
