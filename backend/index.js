import express from "express";
import path from "path";
export const app = express();
import { mongodb } from "./database/db.js";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import note from "./routes/notes.js";

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
